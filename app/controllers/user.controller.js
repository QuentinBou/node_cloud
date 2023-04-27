const {User} = require('../models/index');
require('dotenv').config();
const crypto = require('../middleware/crypto.middleware');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const logger = require('../utils/logger.utils');
const {addLinksToUser} = require('../utils/links.utils');

exports.register = async (req, res) => {
  try {
    const newUser = {
      ...req.body,
      email: await crypto.encrypt(req.body.email),
      password: await bcrypt.hash(req.body.password, 10),
    };
    const createdUser = await User.create(newUser);
    await createdUser.save();

    const userDatas = await addLinksToUser(req, createdUser.dataValues);
    delete userDatas.password;
    userDatas.email = await crypto.decrypt(userDatas.email);

    const userJwt = jwt.sign(userDatas, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    logger.info(`User ${createdUser.id} has been created`);
    return res.status(201).json({...userDatas, token: userJwt});
  } catch (error) {
    logger.error(error.message);
    return res.status(400).json({message: 'User can not be created'});
  }
};

exports.login = async (req, res) => {
  try {
    const userEmail = await crypto.encrypt(req.body.email);
    const userPassword = req.body.password;

    const user = await User.findOne({
      where: {
        email: userEmail,
      },
    });

    if (!user) {
      throw new Error('User not found');
    }

    const passwordIsValid = await bcrypt.compare(userPassword, user.password);
    if (!passwordIsValid) {
      throw new Error('Password is not valid');
    } else {
      const userDatas = await addLinksToUser(req, user.dataValues);
      delete userDatas.password;
      userDatas.email = await crypto.decrypt(userDatas.email);
      const userJwt = jwt.sign(userDatas, process.env.JWT_SECRET, {
        expiresIn: '1h',
      });
      logger.info(`User ${userDatas.id} has logged in`);
      return res.status(200).json({...userDatas, token: userJwt});
    }
  } catch (error) {
    logger.error(error.message);
    return res.status(400).json({
      message: error.message || 'User can not be logged in',
    });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const {firstName, lastName, email, newEmail} = req.body;
    const userEmail = await crypto.encrypt(email);

    const user = await User.findOne({
      where: {
        email: userEmail,
      },
    });

    const userInfosUpdated = {
      ...user.dataValues,
      firstName: firstName ? firstName : user.firstName,
      lastName: lastName ? lastName : user.lastName,
      email: await crypto.encrypt(newEmail ?
         newEmail : email),
    };

    const existingEmail = await User.findOne({
      where: {
        email: userInfosUpdated.email,
        id: userInfosUpdated.id,
      },
    });

    if (existingEmail && existingEmail.id !== userInfosUpdated.id) {
      throw new Error('Email already exists');
    }

    await user.update(userInfosUpdated);

    const userDatas = await addLinksToUser(req, userInfosUpdated);
    delete userDatas.password;
    userDatas.email = await crypto.decrypt(userDatas.email);

    const userJwt = jwt.sign(userDatas, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    logger.info(`User ${userDatas.id} has been updated`);
    return res.status(200).json({...userDatas, token: userJwt});
  } catch (error) {
    logger.error(error.message);
    return res.status(400).json({
      message: error.message || 'Something went wrong',
    });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const userEmail = await crypto.encrypt(req.body.email);

    const user = await User.findOne({
      where: {
        email: userEmail,
      },
    });

    await user.destroy();

    logger.info(`User ${user.id} has been deleted`);
    return res.status(200).json({success: true, message: 'User deleted'});
  } catch (error) {
    logger.error(error.message);
    return res.status(400).json({
      message: error.message || 'Something went wrong',
    });
  }
};

exports.updatePassword = async (req, res) => {
  try {
    const userEmail = await crypto.encrypt(req.body.email);

    const userPassword = req.body.password;
    const newPassword = req.body.newPassword;
    const newPasswordValidate = req.body.newPasswordValidate;

    const user = await User.findOne({
      where: {
        email: userEmail,
      },
    });

    const passwordIsEqual = await bcrypt.compare(userPassword, user.password);

    if (!passwordIsEqual) {
      throw new Error('Password is not valid');
    } else if (newPassword === newPasswordValidate) {
      const newPasswordHashed = await bcrypt.hash(newPassword, 10);
      user.password = newPasswordHashed;
      await user.save();
      logger.info(`User ${user.id} has updated his password`);
      return res
          .status(200)
          .json({success: true, message: 'Password updated'});
    } else {
      throw new Error('Passwords are not equals');
    }
  } catch (error) {
    logger.error(error.message);
    return res.status(400).json({
      message: error.message || 'Something went wrong',
    });
  }
};

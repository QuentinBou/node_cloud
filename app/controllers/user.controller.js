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
    logger.info(`User ${createdUser.id} has been created`);
    return res.status(201).json(createdUser);
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

exports.updateEmail = async (req, res) => {
  try {
    const userEmail = await crypto.encrypt(req.body.email);
    const newEmail = await crypto.encrypt(req.body.newEmail);

    const user = await User.findOne({
      where: {
        email: userEmail,
      },
    });

    user.email = newEmail;
    await user.save();

    logger.info(`User ${user.id} has updated his email`);
    return res.status(200).json({success: true, message: 'Email updated'});
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

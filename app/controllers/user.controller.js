const { User } = require("../models/index");
require("dotenv").config();
const crypto = require("../middleware/crypto.middleware");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

exports.register = async (req, res) => {
  try {
    const newUser = await {
      ...req.body,
      email: await crypto.encrypt(req.body.email),
      password: await bcrypt.hash(req.body.password, 10),
    };
    const createdUser = await User.create(newUser);
    await createdUser.save();
    return res.status(201).json(createdUser);
  } catch (error) {
    return res.status(400).json({ message: "User can not be created" });
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
    const passwordIsValid = await bcrypt.compare(userPassword, user.password);
    if (!passwordIsValid) {
      throw new Error("Password is not valid");
    } else {
      const userDatas = {
        id: user.id,
        email: await crypto.decrypt(user.email),
        firstName: user.firstName,
        lastName: user.lastName,
      };
      const userJwt = jwt.sign(userDatas, process.env.JWT_SECRET || "secret", {
        expiresIn: "1h",
      });
      return res.status(200).json({ ...userDatas, token: userJwt });
    }
  } catch (error) {
    return res.status(400).json({
      message: error.message || "User can not be logged in",
    });
  }
};

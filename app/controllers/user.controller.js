const { User } = require("../models/index");
require("dotenv").config("../config/.env");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

exports.register = async (req, res) => {
  try {
    const newUser = {
      ...req.body,
      password: bcrypt.hashSync(req.body.password, 10),
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
    const userEmail = req.body.email;
    const userPassword = req.body.password;

    const user = await User.findOne({ where: { email: userEmail } });
    const passwordIsValid = bcrypt.compareSync(userPassword, user.password);
    if (!passwordIsValid) {
      return res.status(401).json({ auth: false, token: null });
    } else {
      const userDatas = {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
      };
      const userJwt = jwt.sign(userDatas, process.env.JWT_SECRET || "secret", {
        expiresIn: "1h",
      });
      return res.status(200).json({ ...userDatas, token: userJwt });
    }
  } catch (error) {
    return res
      .status(400)
      .json({
        message: "Authentification failed, please check your credentials...",
      });
  }
};

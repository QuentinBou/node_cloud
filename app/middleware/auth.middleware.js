require('dotenv').config();
const {authToData} = require('../utils/users.utils');

module.exports = (req, res, next) => {
  try {
    const datas = authToData(req.headers.authorization);
    req.auth = {
      userId: datas.userId,
    };
    next();
  } catch (error) {
    res.status(401).json({message: 'You are not authenticated!'});
  }
};

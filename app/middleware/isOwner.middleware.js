/* eslint-disable linebreak-style */
// a middleware for check if user is owner of the account using the auth token
const {authToData} = require('../utils/users.utils');

module.exports = async (req, res, next) => {
  try {
    const datas = authToData(req.headers.authorization);
    if (datas.email === req.body.email) {
      next();
    } else {
      res.status(401).json({message: 'You are not the owner of the account!'});
    }
  } catch (error) {
    res.status(401).json({message: 'You are ah not authenticated!'});
  }
};

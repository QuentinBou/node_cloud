/* eslint-disable linebreak-style */
const jwt = require('jsonwebtoken');
const crypto = require('../middleware/crypto.middleware');


exports.authToToken = (auth) => {
  const token = auth.split(' ')[1];
  return token;
};

exports.tokenToData = (token) => {
  const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
  return decodedToken;
};

exports.authToData = (auth) => {
  return this.tokenToData(this.authToToken(auth));
};

exports.isUser = async (auth, email) => {
  try {
    const datas = this.authToData(auth);
    const encryptedEmail = await crypto.encrypt(datas.email);
    return encryptedEmail === email;
  } catch (error) {
    return false;
  }
};

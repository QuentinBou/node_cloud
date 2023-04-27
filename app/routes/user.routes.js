/* eslint-disable new-cap */
const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');

router.post('/register', userController.register);
router.post('/login', userController.login);
router.put('/update-email', userController.updateEmail);
router.put('/update-password', userController.updatePassword);
router.delete('/delete', userController.deleteUser);

module.exports = router;

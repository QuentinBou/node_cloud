/* eslint-disable new-cap */
const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const isOwner = require('../middleware/isOwner.middleware');

router.post('/register', userController.register);
router.post('/login', userController.login);
router.put('/update', isOwner, userController.updateUser);
router.put('/update-password', isOwner, userController.updatePassword);
router.delete('/delete', isOwner, userController.deleteUser);

module.exports = router;

/* eslint-disable new-cap */
const express = require('express');
const router = express.Router();
const limiter = require('../utils/limiter.utils');

const userRoutes = require('./user.routes');
const woodRoutes = require('./wood.routes');

router.use('/auth', limiter.limiterAuth, userRoutes);
router.use('/wood', limiter.limiterWood, woodRoutes);

module.exports = router;

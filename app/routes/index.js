const express = require('express');
const router = express.Router();

const userRoutes = require('./user.routes');
const woodRoutes = require('./wood.routes');

router.use("/auth", userRoutes);
router.use("/wood", woodRoutes);

module.exports = router;
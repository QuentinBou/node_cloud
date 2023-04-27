const rateLimit = require('express-rate-limit');
const logger = require('./logger.utils');

exports.limiterApi = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 50,
  message: 'Too many requests from this IP, please try again after 15 minutes',
  standardHeaders: true,
  handler: function(req, res, next, options) {
    logger.warn('Too many requests from a User');
    return res.status(options.statusCode).json({message: options.message});
  },
});

exports.limiterAuth = rateLimit({
  windowMs: 5 * 60 * 1000,
  max: 15,
  message:
    'You try to connect too many times, please try again after 5 minutes',
  standardHeaders: true,
  handler: function(req, res, next, options) {
    logger.warn('Too many authentification requests from a User');
    return res.status(options.statusCode).json({message: options.message});
  },
});

exports.limiterWood = rateLimit({
  windowMs: 5 * 60 * 1000,
  max: 25,
  message: 'Too many requests from this IP, please try again after 10 minutes',
  standardHeaders: true,
  handler: function(req, res, next, options) {
    logger.warn('Too many requests from a User in Wood routes');
    return res.status(options.statusCode).json({message: options.message});
  },
});

const jwt = require("jsonwebtoken");
require("dotenv").config("../config/.env");

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization;
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET || 'secret');
        req.auth = {
            userId: decodedToken.userId,
        }
        next();
    } catch (error) {
        res.status(401).json({ message: "You are not authenticated!" });
    }
    };
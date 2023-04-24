const express = require('express');
const app = express();
const db = require("./app/models/index");

db.sequelize.authenticate().then(() => {
    console.log('Database connected...');
}).catch(err => {
    console.error('Unable to connect to the database:', err);
});

module.exports = app;
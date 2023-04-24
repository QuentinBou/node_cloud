const express = require('express');
const app = express();
const db = require("./app/models/index");
const router = require('./app/routes/index');
const path = require('path');


db.sequelize.authenticate().then(() => {
    console.log('Database connected...');
}).catch(err => {
    console.error('Unable to connect to the database:', err);
});

app.use(express.json());

app.use('/api', router)
app.use("/uploads", express.static(path.join(__dirname, "uploads")))

module.exports = app;
const express = require('express');
const app = express();
const db = require('./app/models/index');
const router = require('./app/routes/index');
const path = require('path');
const YAML = require('yamljs');
const swaggerUi = require('swagger-ui-express');
const swagger = YAML.load('./swagger.yaml');
const limiter = require('./app/utils/limiter.utils');

db.sequelize.authenticate().then(() => {
  console.log('Database connected...');
}).catch((err) => {
  console.error('Unable to connect to the database:', err);
});

app.use(express.json());

app.use('/api', limiter.limiterApi, router);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/api-docs', swaggerUi.serve);
app.get('/api-docs', swaggerUi.setup(swagger));


module.exports = app;

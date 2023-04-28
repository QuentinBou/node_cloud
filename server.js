require('dotenv').config();

const app = require('./app');
const port = process.env.PORT || 3000;
const cors = require('cors');
const helmet = require('helmet');

app.use(cors({
  origin: 'http://localhost:8080',
  credentials: true,
}));

app.use(helmet());

app.get('/', (req, res) => {
  res.send(`
    <h1>Server is running</h1>
    <p>Go to <a href="/api-docs">/api-docs</a></p>
    <p>${process.env.BUCKET}</p>
    <p>${process.env.AWS_ACCESS_KEY_ID}</p>
    <p>${process.env.AWS_SECRET_ACCESS_KEY}</p>
  `);
});


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

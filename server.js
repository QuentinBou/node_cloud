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
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

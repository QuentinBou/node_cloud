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

console.log(process.env.BUCKET);
console.log(process.env.AWS_ACCESS_KEY_ID);
console.log(process.env.AWS_SECRET_ACCESS_KEY);


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

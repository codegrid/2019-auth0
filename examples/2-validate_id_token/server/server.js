require('dotenv').config();

if (!process.env.AUTH0_DOMAIN) {
  throw new Error('環境変数 AUTH0_DOMAIN が設定されていません。');
}
if (!process.env.AUTH0_AUDIENCE) {
  throw new Error('環境変数 AUTH0_AUDIENCE が設定されていません。');
}

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const bodyParser = require('body-parser');

const routes = require('./routes');

const app = express();

app.use(cors());
app.use(helmet());
app.use(bodyParser.json());
app.use('/api', routes);

app.use(function(req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  res.status(err.status || 500).json({ message: err.message });
});

app.listen(3000);

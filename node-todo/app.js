const express = require('express');
const helmet = require('helmet');
const bodyParser = require('body-parser');

const app = express();

app.use(helmet());
app.use(bodyParser.json());

const HTTP_PORT = process.env.HTTP_PORT || 8000;
app.listen(HTTP_PORT, () => {
  console.log(`Server is listening on port ${HTTP_PORT}`)
});

module.exports = app;

const express = require('express');
const helmet = require('helmet');
const bodyParser = require('body-parser');

const app = express();
const todoController = require('./controllers/todos.controller.js');

app.use(helmet());
app.use(bodyParser.json());

app.post('/todos', todoController.create);
app.get('/todos', todoController.list);
app.get('/todos/:id', todoController.get);
app.put('/todos/:id', todoController.update);
app.delete('/todos/:id', todoController.delete);

const HTTP_PORT = process.env.HTTP_PORT || 8000;
app.listen(HTTP_PORT, () => {
  console.log(`Server is listening on port ${HTTP_PORT}`)
});

module.exports = app;

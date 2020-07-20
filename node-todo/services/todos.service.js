const { v4: uuidv4 } = require('uuid');
const todos = require('../data/todos.json');

const create = (text, priority = 3) => {
  todos.push({
    id: uuidv4(),
    text: text,
    priority: priority,
    done: false
  });

  return todos[todos.length - 1];
};

const list = () => todos;

const get = id => todos.find(todo => todo.id === id);

const update = (id, text, priority, done) => {
  const index = todos.findIndex(todo => todo.id === id);

  if (index < 0) {
    throw new Error('Task not found.');
  }

  todos.splice(index, 1, { id, text, priority, done });

  return todos[index];
};

const remove = id => {
  const index = todos.findIndex(todo => todo.id === id);

  if (index < 0) {
    throw new Error('Task not found.');
  }

  todos.splice(index, 1);
};

module.exports = {
  create,
  list,
  get,
  update,
  remove
};

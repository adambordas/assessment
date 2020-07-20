const { v4: uuidv4 } = require('uuid');
const fs = require('fs');

const data = fs.readFileSync(`${__dirname}/../data/todos.json`);
const todos = JSON.parse(data);

const saveData = updatedTodos => {
  fs.writeFileSync(`${__dirname}/../data/todos.json`, JSON.stringify(updatedTodos));
};

const create = (text, priority = 3) => {
  todos.push({
    id: uuidv4(),
    text: text,
    priority: priority,
    done: false
  });

  saveData(todos);

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

  saveData(todos);
  
  return todos[index];
};

const remove = id => {
  const index = todos.findIndex(todo => todo.id === id);

  if (index < 0) {
    throw new Error('Task not found.');
  }

  todos.splice(index, 1);

  saveData(todos);
};

module.exports = {
  create,
  list,
  get,
  update,
  remove
};

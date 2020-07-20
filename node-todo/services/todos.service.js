const { v4: uuidv4 } = require('uuid');
const fs = require('fs');

const data = fs.readFileSync(`${__dirname}/../data/todos.json`);
let todos = JSON.parse(data);

// object for storing timeouts for deletion
let doneTodos = {};

/**
 * Overwrites file with new data
 * @param {array} updatedTodos Array of todos
 */
const saveData = updatedTodos => {
  fs.writeFileSync(`${__dirname}/../data/todos.json`, JSON.stringify(updatedTodos));
};

/**
 * Creates new task
 * @param {string} text 
 * @param {number} priority Integer between 1 and 5
 */
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

/**
 * Returns an array of all todos
 */
const list = () => todos;

/**
 * Returns todo by id
 * @param {number} id Id of task
 */
const get = id => todos.find(todo => todo.id === id);

/**
 * Updates task
 * @param {number} id Id of task
 * @param {string} text 
 * @param {number} priority Integer between 1 and 5
 * @param {boolean} done 
 */
const update = (id, text, priority, done) => {
  const index = todos.findIndex(todo => todo.id === id);

  if (index < 0) {
    throw new Error('Task not found.');
  }

  // set timeout for 5 minutes if task is set to done
  if (done && !todos[index].done && !doneTodos[index]) {
    doneTodos[index] = setTimeout(() => { remove(id); }, 5 * 60 * 1000);
  } else if (!done && todos[index].done) {
    clearTimeout(doneTodos[index]);
  }

  todos.splice(index, 1, { id, text, priority, done });

  saveData(todos);
  
  return todos[index];
};

/**
 * Deletes task from todos
 * @param {number} id Id of task
 */
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

const { v4: uuidv4 } = require('uuid');
const fs = require('fs');

let todos = [];

// object for storing timeouts for deletion
let doneTodos = {};

if (process.env.NODE_ENV !== 'test' && fs.existsSync(`${__dirname}/../data/todos.json`)) {
  const data = fs.readFileSync(`${__dirname}/../data/todos.json`);
  todos = JSON.parse(data);
}

/**
 * Overwrites file with new data
 * @param {array} updatedTodos Array of todos
 */
const saveData = updatedTodos => {
  return new Promise(resolve => {
    fs.writeFile(`${__dirname}/../data/todos.json`, JSON.stringify(updatedTodos), resolve);
  });
};

/**
 * Sets timeout for 5 minutes for deleting todo
 * @param {string} id Id of task
 */
const setTodoDeletion = id => {
  doneTodos[id] = setTimeout(() => { remove(id); }, 5 * 60 * 1000);
};

/**
 * Clears timeout for deleting todo with the given id
 * @param {string} id Id of task
 */
const cancelTodoDeletion = id => {
  clearTimeout(doneTodos[id]);
};

/**
 * Creates new task
 * @param {string} text 
 * @param {number} priority Integer between 1 and 5
 */
const create = async (text, priority = 3) => {
  todos.push({
    id: uuidv4(),
    text: text,
    priority: priority,
    done: false
  });

  await saveData(todos);

  return todos[todos.length - 1];
};

/**
 * Returns an array of all todos
 */
const list = () => todos;

/**
 * Returns todo by id
 * @param {string} id Id of task
 */
const get = id => todos.find(todo => todo.id === id);

/**
 * Updates task
 * @param {string} id Id of task
 * @param {string} text 
 * @param {number} priority Integer between 1 and 5
 * @param {boolean} done 
 */
const update = async (id, text, priority, done) => {
  const index = todos.findIndex(todo => todo.id === id);

  if (index < 0) {
    throw new Error('Task not found.');
  }

  if (done && !todos[index].done && !doneTodos[index]) {
    setTodoDeletion(id);
  } else if (!done && todos[index].done) {
    cancelTodoDeletion(id);
  }

  todos.splice(index, 1, { id, text, priority, done });

  await saveData(todos);
  
  return todos[index];
};

/**
 * Deletes task from todos
 * @param {string} id Id of task
 */
const remove = async id => {
  const index = todos.findIndex(todo => todo.id === id);

  if (index < 0) {
    throw new Error('Task not found.');
  }

  await todos.splice(index, 1);

  saveData(todos);
};

module.exports = {
  create,
  list,
  get,
  update,
  remove
};

const todoService = require('../services/todos.service.js');

/**
 * CONTROLLER
 * Creates new task
 *    Accepted body parameters:
 *      - text
 *      - priority (optional)
 */
exports.create = (req, res) => {
  const { text, priority } = req.body;
  if (!text) {
    return res.status(400).json({ error: 'Text parameter is required.' });
  }

  if (priority && Number.isInteger(priority) && [1, 2, 3, 4, 5].indexOf(priority) < 0) {
    return res.status(400).json({ error: 'Priority has to be an integer between 1 and 5.' });
  }

  const todo = todoService.create(text, priority);

  res.status(201).json(todo);
};

/**
 * CONTROLLER
 * Lists all todos 
 */
exports.list = (req, res) => {
  const todos = todoService.list();

  if (todos.length === 0) {
    return res.sendStatus(204);
  }

  res.json(todos);
};

/**
 * CONTROLLER
 * Returns task by id
 */
exports.get = (req, res) => {
  const todo = todoService.get(req.params.id);

  if (!todo) {
    return res.status(404).json({ error: 'Task not found.' });
  }

  res.json(todo);
};

/**
 * CONTROLLER
 * Updates task by id
 *    Accepted body parameters:
 *      - text
 *      - priority
 *      - done
 */
exports.update = (req, res) => {
  const id = req.params.id;
  const { text, priority, done } = req.body;
  if (!text) {
    return res.status(400).json({ error: 'Text parameter is required.' });
  }

  if (typeof done !== 'boolean') {
    return res.status(400).json({ error: 'Done parameter is required' });
  }

  if (priority && Number.isInteger(priority) && [1, 2, 3, 4, 5].indexOf(priority) < 0) {
    return res.status(400).json({ error: 'Priority has to be an integer between 1 and 5.' });
  }

  try {
    const todo = todoService.update(id, text, priority, done);

    res.json(todo);
  } catch (error) {
    if (error.message === 'Task not found.') {
      return res.status(404).json({ error: error.message });
    }

    throw error;
  }
};

/**
 * CONTROLLER
 * Deletes task by id
 */
exports.delete = (req, res) => {
  const id = req.params.id;

  try {
    todoService.remove(id);

    res.json({});
  } catch (error) {
    if (error.message === 'Task not found.') {
      return res.status(404).json({ error: error.message });
    }

    throw error;
  }
};

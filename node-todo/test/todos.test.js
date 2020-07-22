const proxyquire = require('proxyquire');
const assert = require('assert');

const fsStub = function() {};
fsStub.prototype.writeFile = () => true;

const todoService = proxyquire('../services/todos.service.js', {
  'fs': fsStub
});

describe('TODO SERVICE', () => {
  describe('list', () => {
    it('returns an empty array', () => {
      const todos = todoService.list();
      
      assert(Array.isArray(todos));
      assert(todos.length === 0);
    });
  });

  describe('create', () => {
    it('returns the newly created todo item', async () => {
      const todoData = {
        text: 'test',
        priority: 1
      };

      const todo = await todoService.create(todoData.text, todoData.priority);

      assert(todo.id);
      assert(todo.text === todoData.text);
      assert(todo.priority === todoData.priority);
      assert(todo.done === false);
    });

    it('adds todo to the list of todos', () => {
      const todos = todoService.list();

      assert(Array.isArray(todos));
      assert(todos.length === 1);

      assert(todos[0].id);
      assert(todos[0].text);
      assert(todos[0].priority);
      assert(todos[0].done === false);
    });

    it('creates todo without defining a priority', async () => {
      const todoData = {
        text: 'test'
      };

      const todo = await todoService.create(todoData.text);

      assert(todo.id);
      assert(todo.text === todoData.text);
      assert(todo.priority === 3);
      assert(todo.done === false);
    });
  });

  describe('get', () => {
    it('returns undefined for a non-existing id', () => {
      const todo = todoService.get('non-existing-id');

      assert(typeof todo === 'undefined');
    });

    it('returns todo with the requested id', async () => {
      const todoData = {
        text: 'test',
        priority: 1
      };

      const newTodo = await todoService.create(todoData.text, todoData.priority);
      const todo = todoService.get(newTodo.id);

      assert(todo.id === newTodo.id);
      assert(todo.text === todoData.text);
      assert(todo.priority === todoData.priority);
      assert(todo.done === false);
    });
  });

  describe('update', () => {
    it('throws for non-existing id', () => {
      assert.rejects(todoService.update('non-existing-id'));
    });

    it('returns the updated todo', async () => {
      const todoData = {
        text: 'test',
        priority: 1
      };

      const newTodo = await todoService.create(todoData.text, todoData.priority);

      const updatedTodoData = Object.assign(
        {},
        newTodo,
        {
          text: 'test2',
          priority: 2
        }
      );
      const todo = await todoService.update(newTodo.id, updatedTodoData.text, updatedTodoData.priority, updatedTodoData.done);

      assert(todo.text === updatedTodoData.text);
      assert(todo.priority === updatedTodoData.priority);
    })
  });

  describe('remove', () => {
    it('throws for non-existing id', () => {
      assert.rejects(todoService.remove('non-existing-id'));
    });

    it('removes todo from todos', async () => {
      const todoData = {
        text: 'test',
        priority: 1
      };

      const newTodo = await todoService.create(todoData);
      await todoService.remove(newTodo.id);
      const todo = todoService.get(newTodo.id);

      assert(typeof todo === 'undefined');
    });
  });
});

const request = require('supertest');
const assert = require('assert');
const { stub } = require('sinon');
const app = require('../app.js');
const _ = require('lodash');

const todoService = require('../services/todos.service.js');
let createTodoStub;
let listTodosStub;
let getTodoStub;
let updateTodoStub;
let removeTodoStub;

describe('REST API', () => {
  const testTodo = {
    id: 'test',
    text: 'text',
    priority: 5,
    done: false
  };

  describe('GET /todos', () => {

    before(() => {
      listTodosStub = stub(todoService, 'list').returns([]);
    });

    after(() => {
      listTodosStub.restore();
    });

    it('returns 204 when there\'s no todos', done => {
      request(app)
        .get('/todos')
        .expect(204, done);
    });

    it('returns 200 and the list of todos', done => {
      listTodosStub.returns(Array(3).fill(testTodo));

      request(app)
        .get('/todos')
        .expect('Content-Type', /json/)
        .expect(200)
        .then(response => {
          const { body } = response;

          assert(Array.isArray(body));
          assert(body.length === 3);
          body.forEach(todo => {
            assert(todo.id === testTodo.id);
            assert(todo.text === testTodo.text);
            assert(todo.priority === testTodo.priority);
            assert(todo.done === testTodo.done);
          });

          done();
        })
        .catch(done);
    });
  });

  describe('POST /todos', () => {
    before(() => {
      createTodoStub = stub(todoService, 'create').returns(testTodo);
    });

    after(() => {
      createTodoStub.restore();
    });
  
    it('returns 400 for empty text parameter', done => {
      request(app)
        .post('/todos')
        .send({})
        .expect('Content-Type', /json/)
        .expect(400)
        .then(response => {
          const { body } = response;
  
          assert(body.error === 'Text parameter is required.');
  
          done();
        })
        .catch(done);
    });
  
    it('returns 400 for wrong priority parameter', done => {
      request(app)
        .post('/todos')
        .send({ text: 'test', priority: 6 })
        .expect('Content-Type', /json/)
        .expect(400)
        .then(response => {
          const { body } = response;
  
          assert(body.error === 'Priority has to be an integer between 1 and 5.');
  
          done();
        })
        .catch(done);
    });
  
    it('returns 201 with the created todo object', done => {
      request(app)
        .post('/todos')
        .send(_.pick(testTodo, ['text', 'priority']))
        .expect('Content-Type', /json/)
        .expect(201)
        .then(response => {
          const { body } = response;

          assert(body.id === testTodo.id);
          assert(body.text === testTodo.text);
          assert(body.priority === testTodo.priority);
          assert(body.done === testTodo.done);

          done();
        })
        .catch(done);
    });

    it('calls createTodoStub with the requested parameters', async () => {
      assert(createTodoStub.called);
      assert(createTodoStub.args[0][0] === testTodo.text);
      assert(createTodoStub.args[0][1] === testTodo.priority);
    });
  });

  describe('GET /todos/{id}', () => {
    before(() => {
      getTodoStub = stub(todoService, 'get').returns();
    });

    after(() => {
      getTodoStub.restore();
    });

    it('returns 404 when todo does not exist', done => {
      request(app)
        .get('/todos/non-existing-id')
        .expect(404, done);
    });

    it('calls getTodoStub with the requested id', async () => {
      assert(getTodoStub.called);
      assert(getTodoStub.args[0][0] === 'non-existing-id');
    });

    it('returns 200 with the todo item', done => {
      getTodoStub.returns(testTodo);

      request(app)
        .get('/todos/existing-id')
        .expect('Content-Type', /json/)
        .expect(200)
        .then(response => {
          const { body } = response;

          assert(body.id === testTodo.id);
          assert(body.text === testTodo.text);
          assert(body.priority === testTodo.priority);
          assert(body.done === testTodo.done);

          done();
        })
        .catch(done);
    });
  });

  describe('PUT /todos/{id}', () => {
    before(() => {
      updateTodoStub = stub(todoService, 'update').throws(Error('Task not found.'));
    });

    after(() => {
      updateTodoStub.restore();
    });

    it('returns 400 for empty text parameter', done => {
      request(app)
        .put('/todos/todo-id')
        .send(_.pick(testTodo, ['priority', 'done']))
        .expect('Content-Type', /json/)
        .expect(400)
        .then(response => {
          const { body } = response;
  
          assert(body.error === 'Text parameter is required.');
  
          done();
        })
        .catch(done);
    });
  
    it('returns 400 for empty done parameter', done => {
      request(app)
        .put('/todos/todo-id')
        .send(_.pick(testTodo, ['priority', 'text']))
        .expect('Content-Type', /json/)
        .expect(400)
        .then(response => {
          const { body } = response;
  
          assert(body.error === 'Done parameter is required.');
  
          done();
        })
        .catch(done);
    });

    it('returns 400 for wrong priority parameter', done => {
      request(app)
        .put('/todos/todo-id')
        .send(Object.assign({}, testTodo, { priority: 6 }))
        .expect('Content-Type', /json/)
        .expect(400)
        .then(response => {
          const { body } = response;
  
          assert(body.error === 'Priority has to be an integer between 1 and 5.');
  
          done();
        })
        .catch(done);
    });

    it('returns 404 when todo does not exist', done => {
      request(app)
        .put('/todos/non-existing-id')
        .send(_.pick(testTodo, ['text', 'priority', 'done']))
        .expect(404, done);
    });

    it('calls updateTodoStub with the requested id', async () => {
      assert(updateTodoStub.called);
      assert(updateTodoStub.args[0][0] === 'non-existing-id');
    });

    it('returns 200 with the updated todo', done => {
      updateTodoStub.returns(testTodo);

      request(app)
        .put('/todos/existing-id')
        .send(_.pick(testTodo, ['text', 'priority', 'done']))
        .expect('Content-Type', /json/)
        .expect(200)
        .then(response => {
          const { body } = response;

          assert(body.id === testTodo.id);
          assert(body.text === testTodo.text);
          assert(body.priority === testTodo.priority);
          assert(body.done === testTodo.done);

          done();
        })
        .catch(done);
    });

    it('calls updateTodoStub with the requested parameters', async () => {
      assert(updateTodoStub.called);
      assert(updateTodoStub.args[1][0] === 'existing-id');
      assert(updateTodoStub.args[1][1] === testTodo.text);
      assert(updateTodoStub.args[1][2] === testTodo.priority);
      assert(updateTodoStub.args[1][3] === testTodo.done);
    });
  });

  describe('DELETE /todos/{id}', () => {
    before(() => {
      removeTodoStub = stub(todoService, 'remove').throws(Error('Task not found.'));
    });

    after(() => {
      removeTodoStub.restore();
    });

    it('returns 404 when todo does not exist', done => {
      request(app)
        .delete('/todos/non-existing-id')
        .expect(404, done);
    });

    it('calls removeTodoStub with the requested id', async () => {
      assert(removeTodoStub.called);
      assert(removeTodoStub.args[0][0] === 'non-existing-id');
    });

    it('returns 200', done => {
      removeTodoStub.returns();

      request(app)
        .delete('/todos/existing-id')
        .expect(200, done);
    });

    it('calls removeTodoStub with the requested id', async () => {
      assert(removeTodoStub.called);
      assert(removeTodoStub.args[1][0] === 'existing-id');
    });
  });
});


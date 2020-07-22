# NodeJS Developer - Exercise 1
# Solution

## Install and start
Install:
`npm i`

Start server on localhost (default port is 8000):
`npm start`

Run tests:
`npm test`

## Rest api

### GET /todos
Response:
```
[{
  id: "",
  text: "",
  priority: 3,
  done: false
}]
```

### POST /todos
Headers:
```
Content-Type: application/json
```
Body:
```
{
  text: "", // required
  priority: 2 // optional, defaults to 3
}
```
Response:
```
{
  id: "",
  text: "",
  priority: 3,
  done: false
}
```

### GET /todos/:id
Response:
```
{
  id: "",
  text: "",
  priority: 3,
  done: false
}
```

### PUT /todos/:id
Headers:
```
Content-Type: application/json
```
Body:
```
{
  text: "", // required
  priority: 2, // required
  done: false // required
}
```
Response:
```
{
  id: "",
  text: "",
  priority: 3,
  done: false
}
```

### DELETE /todos/:id

# Problem
## Instructions

- Fork this project.
- Write tests.
- Commit the important milestones and not just the final result.

## Exercise description

Create a RESTful API that provides access to a collection called "todos" that contains just the following fields:

- `id`: String. Unique identifier of the todo (can't be set)
- `text`: String. Can only contain english letters. (must be set)
- `priority`: Number. Integer in the range from 1 to 5. (default value is 3)
- `done`: Boolean. (default value is false)

The API must accept JSON request body, and must provide JSON response body.

## Endpoints

### GET /todos

List all of the todos as an array of the todo objects.

### POST /todos

Creates a new todo, sets the given fields from the request body. Returns the new todo object.

### GET /todos/:id

Returns the todo object.

### PUT /todos/:id

Updates the given fields in the todo. Returns the new todo object.

### DELETE /todos/:id

Removes a todo from the collection.

## Tasks

1. Save all of the todos in a JSON file, if any modification happens. Load the collection from this file when the server restarts
2. Remove todos that is done for 5 minutes
3. Create unit tests for the API

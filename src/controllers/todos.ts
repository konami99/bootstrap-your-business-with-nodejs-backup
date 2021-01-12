import { RequestHandler } from 'express';
import { Queue } from 'node-resque';
import { Todo } from '../models/todo';

const TODOS: Todo[] = [];

const connectionDetails = {
  pkg: "ioredis",
  host: process.env.REDIS_URL || '127.0.0.1',
  password: null,
  port: 6379,
  database: 0,
};

const queue = new Queue({ connection: connectionDetails });

export const createTodo: RequestHandler = (req, res, next) => {
  const text = (req.body as { text: string }).text;
  const newTodo = new Todo(Math.random().toString(), text);

  TODOS.push(newTodo);

  res.status(201).json({ message: 'Created the todo.', createdTodo: newTodo });
};

export const getTodos: RequestHandler = async (req, res, next) => {
  await queue.connect();
  await queue.enqueue("math", "add", [1, 2]);

  res.json({ todos: TODOS });
};

export const updateTodo: RequestHandler<{ id: string }> = (req, res, next) => {
  const todoId = req.params.id;

  const updatedText = (req.body as { text: string }).text;

  const todoIndex = TODOS.findIndex(todo => todo.id === todoId);

  if (todoIndex < 0) {
    throw new Error('Could not find todo!');
  }

  TODOS[todoIndex] = new Todo(TODOS[todoIndex].id, updatedText);

  res.json({ message: 'Updated!', updatedTodo: TODOS[todoIndex] });
};

export const deleteTodo: RequestHandler = (req, res, next) => {
  const todoId = req.params.id;

  const todoIndex = TODOS.findIndex(todo => todo.id === todoId);

  if (todoIndex < 0) {
    throw new Error('Could not find todo!');
  }

  TODOS.splice(todoIndex, 1);

  res.json({ message: 'Todo deleted!' });
};

import { RequestHandler } from 'express';
import { Queue } from 'node-resque';
import QueueService from '../services/queue/queueService';
import DbConnection from '../services/db/dbConnection';
import Todo from '../entities/Todo';


export const createTodo: RequestHandler = (req, res, next) => {
  

  res.status(201).json({ message: 'Created the todo.' });
};

export const getTodos: RequestHandler = async (req, res, next) => {
  await QueueService.enqueue('email', 'send', ['konami99@hotmail.com']);

  const connection = await DbConnection.getConnection();

  let todo = new Todo();
  todo.text = 'buy milk';
  await connection.manager.save(todo);

  const count = await Todo.count();

  console.log(`count: ${count}`);

  res.json({ todosCount: count });
};

export const updateTodo: RequestHandler<{ id: string }> = (req, res, next) => {

  res.json({ message: 'Updated!' });
};

export const deleteTodo: RequestHandler = (req, res, next) => {

  res.json({ message: 'Todo deleted!' });
};

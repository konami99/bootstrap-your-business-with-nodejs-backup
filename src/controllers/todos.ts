import { RequestHandler } from 'express';
import { Queue } from 'node-resque';
import QueueService from '../services/queue/queueService';
import DbConnection from '../services/db/dbConnection';
import Todo from '../entities/Todo';


export const createTodo: RequestHandler = async (req, res, next) => {
  /*
  const connection = await DbConnection.getConnection();
  let todo = new Todo();
  todo.text = 'buy milk';
  await connection.manager.save(todo);
  */

  await QueueService.enqueue('email', 'send', ['konami99@hotmail.com']);

  res.status(200).json({ message: 'Todo created' });
};

export const getTodos: RequestHandler = async (req, res, next) => {
  const count = await Todo.count();

  res.status(200).json({ todosCount: count });
};

export const updateTodo: RequestHandler<{ id: string }> = (req, res, next) => {
  res.status(200).json({ message: 'Todo updated' });
};

export const deleteTodo: RequestHandler<{ id: string }> = (req, res, next) => {
  res.status(200).json({ message: 'Todo deleted' });
};

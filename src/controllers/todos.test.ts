import app from '../app';
import request from 'supertest';
import DbConnection from '../services/db/dbConnection';
import Todo from '../entities/Todo';
import { getConnection } from 'typeorm';

jest.mock('node-resque', () => {
  return { 
    Queue: jest.fn().mockImplementation(() => {
      return {
        connect: jest.fn(),
        enqueue: jest.fn(),
        end: jest.fn()
      }
    }),
  }
});

beforeAll(async () => {
  await DbConnection.getConnection();
})

afterAll(async () => {
  await DbConnection.closeConnection();
});

afterEach(async () => {
  await getConnection().createQueryBuilder().delete().from(Todo).execute();
});

describe('getTodos', () => {
  beforeEach(async () => {
    const connection = await DbConnection.getConnection();
    let todo = new Todo();
    todo.text = 'buy milk';
    await connection.manager.save(todo);
  });

  it('returns correct todo count', async () => {
    const response = await request(app).get('/todos').expect(200);
    expect(response.body).toMatchObject({
      todosCount: 1
    })
  })
})

describe('createTodo', () => {
  it('returns correct message', async () => {
    const response = await request(app).post('/todos').expect(200);
    expect(response.body).toMatchObject({
      message: 'Todo created'
    })
  })
})

describe('updateTodo', () => {
  it('returns correct message', async () => {
    const response = await request(app).patch('/todos/1').expect(200);
    expect(response.body).toMatchObject({
      message: 'Todo updated'
    })
  })
})

describe('deleteTodo', () => {
  it('returns correct message', async () => {
    const response = await request(app).delete('/todos/3').expect(200);
    expect(response.body).toMatchObject({
      message: 'Todo deleted'
    })
  })
})
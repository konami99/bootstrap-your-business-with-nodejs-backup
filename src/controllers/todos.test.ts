import app from '../app';
import request from 'supertest';
import DbConnection from '../services/db/dbConnection';

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

beforeEach(async () => {
  await DbConnection.getConnection();
});

afterEach(async () => {
  await DbConnection.closeConnection();
});

describe('', () => {
  it('', async () => {
    const response = await request(app).get('/todos').expect(200);
  })
})
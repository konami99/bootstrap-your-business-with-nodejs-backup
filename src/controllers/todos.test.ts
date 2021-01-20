import app from '../app';
import request from 'supertest';
import DbConnection from '../services/db/dbConnection';

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
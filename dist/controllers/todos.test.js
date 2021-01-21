"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("../app"));
const supertest_1 = __importDefault(require("supertest"));
const dbConnection_1 = __importDefault(require("../services/db/dbConnection"));
const Todo_1 = __importDefault(require("../entities/Todo"));
const typeorm_1 = require("typeorm");
jest.mock('node-resque', () => {
    return {
        Queue: jest.fn().mockImplementation(() => {
            return {
                connect: jest.fn(),
                enqueue: jest.fn(),
                end: jest.fn()
            };
        }),
    };
});
beforeAll(async () => {
    await dbConnection_1.default.getConnection();
});
afterAll(async () => {
    await dbConnection_1.default.closeConnection();
});
afterEach(async () => {
    await typeorm_1.getConnection().createQueryBuilder().delete().from(Todo_1.default).execute();
});
describe('getTodos', () => {
    beforeEach(async () => {
        const connection = await dbConnection_1.default.getConnection();
        let todo = new Todo_1.default();
        todo.text = 'buy milk';
        await connection.manager.save(todo);
    });
    it('returns correct todo count', async () => {
        const response = await supertest_1.default(app_1.default).get('/todos').expect(200);
        expect(response.body).toMatchObject({
            todosCount: 1
        });
    });
});
describe('createTodo', () => {
    it('returns correct message', async () => {
        const response = await supertest_1.default(app_1.default).post('/todos').expect(200);
        expect(response.body).toMatchObject({
            message: 'Todo created'
        });
    });
});
describe('updateTodo', () => {
    it('returns correct message', async () => {
        const response = await supertest_1.default(app_1.default).patch('/todos/1').expect(200);
        expect(response.body).toMatchObject({
            message: 'Todo updated'
        });
    });
});
describe('deleteTodo', () => {
    it('returns correct message', async () => {
        const response = await supertest_1.default(app_1.default).delete('/todos/3').expect(200);
        expect(response.body).toMatchObject({
            message: 'Todo deleted'
        });
    });
});

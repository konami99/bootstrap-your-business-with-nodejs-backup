"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTodo = exports.updateTodo = exports.getTodos = exports.createTodo = void 0;
const queueService_1 = __importDefault(require("../services/queue/queueService"));
const Todo_1 = __importDefault(require("../entities/Todo"));
const createTodo = async (req, res, next) => {
    /*
    const connection = await DbConnection.getConnection();
    let todo = new Todo();
    todo.text = 'buy milk';
    await connection.manager.save(todo);
    */
    await queueService_1.default.enqueue('email', 'send', ['konami99@hotmail.com']);
    res.status(200).json({ message: 'Todo created' });
};
exports.createTodo = createTodo;
const getTodos = async (req, res, next) => {
    const count = await Todo_1.default.count();
    res.status(200).json({ todosCount: count });
};
exports.getTodos = getTodos;
const updateTodo = (req, res, next) => {
    res.status(200).json({ message: 'Todo updated' });
};
exports.updateTodo = updateTodo;
const deleteTodo = (req, res, next) => {
    res.status(200).json({ message: 'Todo deleted' });
};
exports.deleteTodo = deleteTodo;

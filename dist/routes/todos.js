"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authentication_1 = __importDefault(require("../middlewares/authentication"));
const todos_1 = require("../controllers/todos");
const router = express_1.Router();
// router.use(authentication);
router.post('/', todos_1.createTodo);
router.get('/', authentication_1.default, authentication_1.default, todos_1.getTodos);
router.patch('/:id', todos_1.updateTodo);
router.delete('/:id', todos_1.deleteTodo);
exports.default = router;

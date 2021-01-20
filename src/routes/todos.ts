import { Router } from 'express';
import authentication from '../middlewares/authentication';

import { createTodo, getTodos, updateTodo, deleteTodo } from '../controllers/todos';

const router = Router();

// router.use(authentication);

router.post('/', createTodo);

router.get('/', authentication, authentication, getTodos);

router.patch('/:id', updateTodo);

router.delete('/:id', deleteTodo);

export default router;
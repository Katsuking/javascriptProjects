import { Router } from 'express';
import * as TodoHandlers from './todos.handlers'; // X import { findAllTodos } from "./todos.handlers"
import Todo from './todos.schema';
import { validateRequest } from '../../middlewares';

const router = Router();

router.get('/', TodoHandlers.findAllTodos);
router.post(
  '/',
  // middleware に定義
  validateRequest({
    body: Todo,
  }),
  TodoHandlers.createOne,
);

export default router;

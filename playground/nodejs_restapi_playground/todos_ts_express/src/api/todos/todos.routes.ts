import { Router } from 'express';
import * as TodoHandlers from './todos.handlers'; // X import { findAllTodos } from "./todos.handlers"
import { ParamWithId, Todo } from './todos.schema';
import { validateRequest } from '../../middlewares';

const router = Router();

// get todos
router.get('/', TodoHandlers.findAllTodos);

// get a todo
router.get(
  '/:id',
  validateRequest({ params: ParamWithId }),
  TodoHandlers.getTodoById,
);

// update a todo
// リクエストのparam に渡されるid と bodyが正しいこと
router.put(
  '/:id',
  validateRequest({ params: ParamWithId, body: Todo }),
  TodoHandlers.updateTodoById,
);

// create a todo
router.post(
  '/',
  // middleware に定義
  validateRequest({
    body: Todo,
  }),
  TodoHandlers.createTodo,
);

// delete a todo
router.delete(
  '/:id',
  // middleware に定義
  validateRequest({ params: ParamWithId }),
  TodoHandlers.deleteTodo,
);

export default router;

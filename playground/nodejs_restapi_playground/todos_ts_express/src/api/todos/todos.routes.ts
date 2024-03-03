import { Router } from 'express';
import * as TodoHandlers from './todos.handlers'; // X import { findAllTodos } from "./todos.handlers"

const router = Router();

router.get('/', TodoHandlers.findAllTodos);
router.post('/', TodoHandlers.createOne);

export default router;

import { db } from '../../lib/db';
import { ParamWithId, Todo } from './todos.schema';
import type { Todos } from '@prisma/client';
import { NextFunction, Request, Response } from 'express';

// 一般的には handler じゃなくて controlersの方が多いかな?

export const findAllTodos = async (
  req: Request,
  res: Response<Todo[]>,
  next: NextFunction,
) => {
  try {
    // throw Error('something went wrong'); // middleware の errorHanderの動作確認
    // router で使用する todosテーブルをすべて取得する処理
    const result = await db.todos.findMany();
    res.json(result);
  } catch (error) {
    // middleware で定義されている errorHandler に飛ばす
    next(error);
  }
};

// req について
// request paramsは空
// 第2引数は、response body なので id がついたprismaの型を渡す
// 第3引数には、request body なので、id はいらない zod で定義したものを使う
export const createTodo = async (
  req: Request<{}, Todos, Todo>,
  res: Response,
  next: NextFunction,
) => {
  try {
    // const validated_data = await Todo.parseAsync(req.body); // middlewareで定義に変更
    // db 書き込み
    const result = await db.todos.create({
      data: req.body, // validation 窯してるからそのまま渡せばいい
    });

    return res.json(result);
  } catch (error) {
    next(error);
  }
};

export const getTodoById = async (
  req: Request<ParamWithId, Todos, {}>,
  res: Response<Todos>,
  next: NextFunction,
) => {
  try {
    const id = req.params.id;
    const todo = await db.todos.findUnique({
      where: { id },
    });

    if (!todo) {
      res.status(404);
      throw new Error(`Todo with id ${req.params.id} not found`);
    }

    res.json(todo);
  } catch (error) {}
};

export const updateTodoById = async (
  req: Request<ParamWithId, Todos, Todo>,
  res: Response<Todos>,
  next: NextFunction,
) => {
  try {
    const id = req.params.id;
    const todo = await db.todos.update({
      where: { id },
      data: req.body,
    });
    if (!todo) {
      throw new Error(`Could not update todo with ${req.params.id}`);
    }
    return res.json(todo);
  } catch (error) {}
};

export const deleteTodo = async (
  req: Request<ParamWithId, {}, {}>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const id = req.params.id;
    const todo = await db.todos.findUnique({
      where: { id },
    });

    if (!todo) {
      res.status(404);
      throw new Error(`Could not update todo with ${req.params.id}`);
    }

    await db.todos.delete({
      where: { id: todo.id },
    });

    res.sendStatus(204).end();
  } catch (error) {}
};

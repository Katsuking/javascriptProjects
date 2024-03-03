import { ZodError } from 'zod';
import { db } from '../../lib/db';
import Todo from './todos.schema';
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
export const createOne = async (
  req: Request<{}, Todos, Todo>,
  res: Response,
  next: NextFunction,
) => {
  try {
    // zod を使ったvalidation
    const validated_data = await Todo.parse(req.body);
    // db 書き込み
    const result = await db.todos.create({
      data: validated_data,
    });

    return res.json(result);
  } catch (error) {
    if (error instanceof ZodError) {
      res.status(422); // zod の validation エラーの場合
    }
    next(error);
  }
};

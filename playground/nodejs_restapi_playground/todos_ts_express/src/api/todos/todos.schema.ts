import { Prisma } from '@prisma/client';
import * as z from 'zod';

// prsima.schema の型情報を満たすような zod を作成
// Prisma.テーブル名CreateInputは自動で作成される
export const Todo = z.object({
  content: z.string().min(1),
  done: z.boolean().default(false),
}) satisfies z.ZodType<Prisma.TodosCreateInput>;

// 下記のような built-in のvalidationが可能になる
// const result = Todo.parse({
//   content: 'hell world',
// });

// tsでは、Object と その型は同じ名前でexportして、使える
export type Todo = z.infer<typeof Todo>;

export default Todo;

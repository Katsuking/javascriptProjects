import TodoItem from "@/components/TodoItem";
import { prisma } from "@/db"
import Link from "next/link"


function getTodos() {
  return prisma.todo.findMany();
}

async function toggleTodo(id:string, complete:boolean) {
  // タスクのチェックを保持する
  "use server"
  // console.log(id, complete); // 確認

  // db タスク更新
  await prisma.todo.update({
    where: {id},
    data: {complete}
  });

}

export default async function Home() {

  // 試しにデータをいれてみる
  // await prisma.todo.create({data: {title: "next.js is god tier", complete: false}})

  // たったこんだけ... dbにクエリ送れるのすごいな
  const todos = await getTodos()
  return <div>
  <header className="flex justify-between mb-4 items-center">
    <h1 className="text-2xl">Todo</h1>
    <Link
      className="border border-slate-300 text-slate-300 px-2 py-1 rounded hover:bg-slate-700 focus-within:bg-slate-700 outline-none"
      href="/new"> New</Link>
  </header>
  <ul className="pl-4 cursor-pointer">
    {todos.map((todo) => (
      // プロパティを渡す
      <TodoItem key={todo.id} {...todo} toggleTodo={toggleTodo}></TodoItem>
    ))}
  </ul>
  </div>
}
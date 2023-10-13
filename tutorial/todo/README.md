This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

### prisma

```sh
npm i prisma --save-dev
npx prisma init --datasource-provider sqlite
```
モデル変更後
`npx prisma migrate dev --name init`


### DBからデータを取得

```tsx

import { prisma } from "@/db"
import Link from "next/link"


function getTodos() {
  return prisma.todo.findMany();
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
  <ul className="pl-4">
    {todos.map(todo => <li key={todo.id}> {todo.title} </li> )}
  </ul>
  </div>
}
```

### components




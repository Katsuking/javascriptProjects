### はじめに

vscode で prettier を入れている場合は、下記のように設定するとダブルクォートで怒られない

`Ctrl + p` userSetting

```json
  "prettier.singleQuote": true,
  "prettier.trailingComma": "all",
```

### 下記のテンプレートを使って作成

```sh
npx create-express-api --typescript --directory my-api-name
```

postman を使わずに vscode 拡張機能の `rest client`を使う

### packages

いつも通り prisma と zod を使っていきます

```sh

npm i zod @prisma/client cookie-parser bcryptjs jsonwebtoken socket.io
npm i prisma --save-dev
```

初期化

```sh
npx prisma init --datasource-provider mysql
```

Includes API Server utilities:

- [morgan](https://www.npmjs.com/package/morgan)
  - HTTP request logger middleware for node.js
- [helmet](https://www.npmjs.com/package/helmet)
  - Helmet helps you secure your Express apps by setting various HTTP headers. It's not a silver bullet, but it can help!
- [dotenv](https://www.npmjs.com/package/dotenv)
  - Dotenv is a zero-dependency module that loads environment variables from a `.env` file into `process.env`
- [cors](https://www.npmjs.com/package/cors)
  - CORS is a node.js package for providing a Connect/Express middleware that can be used to enable CORS with various options.

Development utilities:

- [nodemon](https://www.npmjs.com/package/nodemon)
  - nodemon is a tool that helps develop node.js based applications by automatically restarting the node application when file changes in the directory are detected.
- [eslint](https://www.npmjs.com/package/eslint)
  - ESLint is a tool for identifying and reporting on patterns found in ECMAScript/JavaScript code.
- [jest](https://www.npmjs.com/package/jest)
  - Jest is a delightful JavaScript Testing Framework with a focus on simplicity.
- [supertest](https://www.npmjs.com/package/supertest)
  - HTTP assertions made easy via superagent.

### なぜ zod を使うのか?

下記のように書けば、validation や型を提供してくれる

```ts
import * as z from 'zod';

const Todo = z.object({
  content: z.string().min(1),
  done: z.boolean().default(false),
});

type Todo = z.infer<typeof Todo>;
export default Todo;
```

property が足りないときはブチ切れてくれる

```
src/api/todos/todos.routes.ts:8:5 - error TS2741: Property 'done' is missing in type '{ content: string; }' but required in type '{ content: string; done: boolean; }'.

 8     {
       ~
 9       content: 'Learn typeScript',
   ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
10     },
   ~~~~~
```

### テスト

```sql
insert into Todos (id, content, done ) VALUES
("Hello world", "this is content1", true),
("Hell yeah", "this is content2", false);
```

### jest

[setupFilesAfterEnv](https://jestjs.io/docs/configuration#setupfilesafterenv-array)

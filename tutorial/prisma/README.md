### Prismaで遊んでみる

#### 環境構築

まずは、TypeScriptプロジェクトを用意

```sh
npm init -y
npm install typescript ts-node @types/node --save-dev
```
typescript: TypeScriptの本体パッケージです。TypeScriptは、JavaScriptに静的な型チェックを追加するためのプログラミング言語です。

ts-node: TypeScriptを実行するためのランタイム環境です。通常、TypeScriptを実行するためには、コードをJavaScriptにコンパイルしてから実行する必要がありますが、ts-nodeを使用すると、直接TypeScriptコードを実行することができます。

@types/node: Node.jsの型定義ファイルです。TypeScriptは静的な型チェックを行うため、JavaScriptのライブラリやフレームワークを使用する際に、その型情報を提供する型定義ファイルが必要です。@types/nodeは、Node.jsの型情報を提供するパッケージです。

TypesScirptの初期化

```sh
npx tsc --init
```

プロジェクト内に Prisma CLI を開発依存関係としてインストール
```sh
npm install prisma --save-dev
npx prisma init --datasource-provider sqlite
```

#### prisma
設定ファイル

**Userを用意した後に `npx prisma format`でPostのモデルを用意できて便利**

prisma/schema.prisma
```prisma
model User {
  id    Int     @id @default(autoincrement())
  email String  @unique
  name  String?
  posts Post[]
}

model Post {
  id        Int     @id @default(autoincrement())
  title     String
  content   String?
  published Boolean @default(false)
  author    User    @relation(fields: [authorId], references: [id])
  authorId  Int
}
```

##### @relation
ORMがはじめてじゃなけりゃだいたい想像つくと思うけど、
`@relation(fields: [userId], references: [id])`: @relation ディレクティブは、関連性の設定を指定するために使用されます。fields パラメータには、現在のモデル（Post）内のフィールド名を指定し、references パラメータには関連するモデル（User）のプライマリキー（id）を指定します。このようにすることで、userId フィールドが User モデルの id フィールドに関連付けられます

##### ?について
?のあるフィールドはオプション（nullable）であり、関連する User レコードが存在しない場合には null 値を持つことができます

では、Migrationを行います.
```sh
npx prisma migrate dev --name init
```
これで実際にDBの作成とSQL migration fileの作成と実行を行います。
prismaディレクトリを確認

#### クエリを送ってみる

```sh
touch script.ts
```

拡張機能があれば、`PrismaClient`と入力すれば、インポートしてくれる
とはいえ、この雛形がある

```typescript
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

async function main() {
    // Query
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.log(e)
        await prisma.$disconnect()
        process.exit(1)
    })
```
#### Userレコード作成

```typescript
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

async function main() {
  const user = await prisma.user.create({
    data: {
      name: 'Alice',
      email: 'alice@prisma.io',
    },
  })
  console.log(user)
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.log(e)
        await prisma.$disconnect()
        process.exit(1)
    })

```

このスクリプトを実行 -> ユーザー作成
`npx ts-node script.ts`
output: `{ id: 1, email: 'test@test.com', name: 'Alice' }`

/get_users.ts
```typescript
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    const users = await prisma.user.findMany()
    console.log(users)
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
```

#### working with relations

prismaでは、他のモデルを扱うのが超かんたん

[relation queries with Prisma](https://www.prisma.io/docs/getting-started/quickstart#43-explore-relation-queries-with-prisma)





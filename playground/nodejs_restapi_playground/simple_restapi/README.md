# すごくシンプルな webAPI を作成する

### 使用するもの

- nodejs
- expressjs
- prisma (sqlite3)

## packages

```sh
npm i express prisma sqlite3
npm i -D prisma
```

```sh
npx prisma init
npx prisma migrate dev --name init # sqlite3 を使う設定にして、migrate
```

### 検証

- GET: 全ユーザーの取得

```sh
curl http://127.0.0.1:3008/users
```

- GET: 個別のユーザーを取得

```sh
curl http://127.0.0.1:3008/user/1
```

- POST: 新規ユーザー作成

```sh
DATA='{"name":"bonny", "email":"bonny@example.com"}'
TYPE="Content-Type: application/json"
curl -X POST http://127.0.0.1:3008/user -d ${DATA}  -H ${TYPE}
```

- PUT: 個別ユーザーの編集

```sh
DATA='{"name":"bonny", "email":"modifiied_bonny@example.com"}'
curl -X PUT http://127.0.0.1:3008/user/2 -d ${DATA}  -H ${TYPE}
```

### packages

```sh
npm install -dev prisma
npm i dotenv @prisma/client bcrypt jsonwebtoken uuid express
```

`dotenv`がなくても node の version 20 以上であれば、
`node --env-file=.env test.js` のように env ファイルを指定すれば読んでくれるようにはなった。

### 実行

```json
  "scripts": {
    "start": "node --env-file=.env api/app.js"
  },
```

パッケージや DB の設定ができたら, 上記のように設定してあるので, `npm start`で動かせる

### try it out

curl を使って

```sh
DATA='{"password":"bonny", "email":"modifiied_bonny@example.com"}'
TYPE="Content-Type: application/json"
curl -X POST http://127.0.0.1:3100/auth/register -d ${DATA}  -H ${TYPE}
```

`http://127.0.0.1:3100/auth/login`に変えればトークンを新規に取得できる

ログインで取得したリフレッシュトークンを使って処理する

```sh
TYPE="Content-Type: application/json"
TOKEN="Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJhMDYwNjllOS1hNGIxLTQzOTQtODJkMS1lZDgyYmNhYWM2YjQiLCJqdGkiOiJiYzU3ZTc1My1jMWZkLTRmYzYtODM2Ni05MTNjYzQ0YTNmMWMiLCJpYXQiOjE3MDcyNjQ2NTcsImV4cCI6MTcwNzMwMDY1N30.6GrrFoxRahMHDIIb98GsTXrojxOs-J7R1BE93YbJ_kU"
curl http://127.0.0.1:3100/users/profile -H ${TOKEN} -H ${TYPE}
```

うまくいけば、下記のような password を除いたユーザーの情報が取得できるはず

```json
{
  "id": "a06069e9-a4b1-4394-82d1-ed82bcaac6b4",
  "email": "modifiied_bonny@example.com",
  "createdAt": "2024-02-06T11:11:43.214Z",
  "updatedAt": "2024-02-06T11:11:43.214Z"
}
```

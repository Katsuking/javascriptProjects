1. 初期化

```bash
npm init -y
npm i -D typescript ts-node nodemon
```

2. TS の設定

```bash
npx tsc --init
```

tsconfig.json が作成されるので、必要な設定をコメントアウトする。
(tsconfig.json の中身を確認すること)

nodemon.json

```json
{
  "watch": ["src"],
  "ext": ".ts,.js",
  "exec": "ts-node ./src/index.ts"
}
```

package.json
この一行を追加する

```json
    "start": "nodemon",
```

3. Hello world!

この段階で nodemon を実行してみる

`tree -L 2 -I node_modules`

```
.
├── README.md
├── nodemon.json
├── package-lock.json
├── package.json
├── src
│   └── index.ts // console.log('hello world!!');だけ記載
└── tsconfig.json

1 directory, 6 files

```

4. 必要なパッケージのインストール

```bash
npm i express body-parser cookie-parser compression cors dotenv crypto
npm i -D @types/express @types/body-parser @types/cookie-parser @types/compression @types/cors
```

mongodb を使う場合は、

```bash
npm i mongoose
```

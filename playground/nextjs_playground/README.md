### packages

prettier: formatter
prettier-plugin-tailwindcss: tailwindcss公式
[setup](https://github.com/tailwindlabs/prettier-plugin-tailwindcss)
[one more](https://nextjs.org/docs/pages/building-your-application/configuring/eslint#usage-with-other-tools)
create new file for config

```sh
npm i -D prettier eslint-config-prettier prettier-plugin-tailwindcss
```

next auth

```sh
npm install next-auth
```

ui
[setup](https://daisyui.com/docs/install/)

```sh
npm i -D daisyui@latest
```

prisma: for db

```sh
npm i prisma @prisma/client
npm i @auth/prisma-adapter # for next auth
```

### BD

dockerでmongoDBを用意
GUIはmongo expressを使用

`http://localhost:8081/`
user: admin
password: pass

### prisma

```sh
npx prisma init
npx prisma db pull
npx prisma db push # make change
npx prisma genereate # create client
```

connection string
[setup](https://www.prisma.io/docs/concepts/database-connectors/mongodb)
[instance](https://vercel.com/guides/nextjs-prisma-postgres#step-4.-install-and-generate-prisma-client)

paramsがないとうまく行かなかったので注意

```.env
DATABASE_URL="mongodb://root:root_password@127.0.0.1:27017/mydb?retryWrites=true&w=majority&authSource=admin&directConnection=true"
```

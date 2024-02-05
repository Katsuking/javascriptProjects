### passkey (nodejs expressjs)

```sh
docker compose up -d
docker compose run --service-ports web bash
```

install express.js on docker

```sh
npm i express --save
npm i nodemon --save-dev
```

```sh
docker compose exec web npm install sequelize --save
docker compose exec web npm install sequelize-cli --save-dev
docker compose exec web npx sequelize-cli init
```

postgres

```sh
docker compose exec web npm i pg --save
```

[sequelize](https://sequelize.org/docs/v6/other-topics/migrations/)

```sh
docker compose exec web npm i ejs express-ejs-layouts --save
```

### debug

```sh
docker logs -f <コンテナ名>
```

### postgres

```sh
docker compose exec postgres bash
psql -h 0.0.0.0 -U im-outie -d node_dev
```

```sh
docker compose exec web npx sequelize-cli model:generate --name User --attributes email:string
```

ちょっと修正した後, migration を実行するコマンド

```sh
docker compose exec web npx sequelize-cli db:migrate
```

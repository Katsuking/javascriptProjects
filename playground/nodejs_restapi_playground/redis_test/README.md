### redis への接続を試す

`ioredis`pacage を使用

[Github ioredis](https://github.com/redis/ioredis)

```sh
docker compose exec redis-stack redis-cli
```

自分の場合, alias があるので

```sh
dce redis-stack redis-cli
```

### express を使って、エンドポイントを作成

```sh
npm i express
```

###

set

```sh
curl -X POST \
  -H "Content-Type: application/json" \
  -d '{ "key": "tay", "value": "keith" }' \
  http://localhost:3008/redis/set
```

get

```sh
curl -X POST \
  -H "Content-Type: application/json" \
  -d '{ "key": "tay"}' \
  http://localhost:3008/redis/get
```

### env

特に docker-compose.yaml で env とかを設定しなくてもローカルで試すなら問題ない
.env に渡す

```
MONGODB_URI='mongodb://mongodb:27017?authSource=admin/mydb&directConnection=true&replicaSet=null&retryWrites=true'
```

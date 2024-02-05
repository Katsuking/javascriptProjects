const { PrismaClient } = require("@prisma/client");
const express = require("express");

// インスタンスの作成
const prisma = new PrismaClient();
const app = express();
const PORT = 3008;

// middlewareの追加
// HTTPリクエストを解析して、JSONとして使えるようにする
// これでJSON形式で送信されたPOSTリクエストのデータが扱えるようになる
app.use(express.json());

app.listen(PORT, () => {
  console.log(`REST API server is ready at ${PORT}`);
});

app.get("/users", async (req, res) => {
  // user をすべて取得
  const users = await prisma.user.findMany();
  res.json(users);
});

// 個別のユーザー取得
app.get("/user/:id", async (req, res) => {
  const { id } = req.params; // url paramsを扱う
  const user = await prisma.user.findUnique({
    where: { id: Number(id) },
  });
  if (user) console.log({ user });
  if (user) console.log("ユーザー名:", user.name);

  res.json(user);
});

// ユーザーの新規作成
app.post("/user", async (req, res) => {
  const { name, email } = req.body;
  const user = await prisma.user.create({
    data: { name, email },
  });
  res.json(user);
});

// 個別ユーザーの編集
app.put("/user/:id", async (req, res) => {
  const { id } = req.params;
  const { name, email } = req.body;
  const user = await prisma.user.update({
    where: { id: Number(id) },
    data: { name, email },
  });

  res.json(user);
});

// 個別ユーザーの削除
app.delete("/user/:id", async (req, res) => {
  const { id } = req.params;
  const user = await prisma.user.delete({ where: { id: Number(id) } });
  if (user) {
    console.log(user.name, "is deleted!");
  }
  res.json(user);
});

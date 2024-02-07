const Redis = require("ioredis");
const express = require("express");

const app = new express();
app.use(express.json());

const PORT = 3008;
app.listen(PORT, () => {
  console.log(`REST API server is ready at ${PORT}`);
});

const redis = new Redis({
  port: 6379, // Redis port
  host: "127.0.0.1", // Redis host
  username: "default", // needs Redis >= 6
  password: "",
  db: 0, // Defaults to 0
});

app.get("/ping", async (req, res) => {
  res.send("pong");
});

// curl http://localhost:3008/redis/set?key=foo&value=bar
// curl http://localhost:3008/redis/get?key=foo
app.get("/redis/:command", async (req, res) => {
  const { command } = req.params;
  const { key, value } = req.query;
  console.log(req.query);
  try {
    if (command === "set") {
      const result = await redis[command](key, value);
      return res.json({ result });
    } else if (command === "get") {
      const result = await redis[command](key);
      return res.json({ result });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post("/redis/:command", async (req, res) => {
  const { command } = req.params;
  const { key, value } = req.body;

  console.log(req.body); // 送信されたJSONデータを確認

  try {
    if (command === "set") {
      const result = await redis[command](key, value);
      return res.json({ result });
    } else if (command === "get") {
      const result = await redis[command](key);
      return res.json({ result });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post("*", async (req, res) => {
  const { body: args } = req;
  console.log("args: ", args);

  const method = req.url.substr(1, req.url.length - 1);
  console.log("url: ", req.url);
  console.log("method: ", method);

  if (typeof redis[method] !== "function") {
    return res.json({ error: "method is not function !!" });
  }

  console.log(...args);

  const result = await redis[method](...args).catch((err) => {
    return res.json({ error: "Something went wrong" });
  });

  return res.json({ result });
});

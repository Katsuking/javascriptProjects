const Redis = require("ioredis");

const redis = new Redis({
  port: 6379, // Redis port
  host: "127.0.0.1", // Redis host
  username: "default", // needs Redis >= 6
  password: "",
  db: 0, // Defaults to 0
});

redis.set("hello", "world");

redis.get("hello", (err, result) => {
  if (err) {
    console.error(err);
  } else {
    console.log(result);
  }
});

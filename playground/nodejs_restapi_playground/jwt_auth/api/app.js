const express = require("express");

const app = express();
app.use(express.json());
app.use("/auth", require("./auth/auth.routes"));
app.use("/users", require("./users/users.routes"));
app.use("/test", require("./test")); // test

const port = process.env.PORT || 5000;
app.listen(port, () => {
  /* eslint-disable no-console */
  console.log(`Listening: http://localhost:${port}`);
  /* eslint-enable no-console */
});

module.exports = app;

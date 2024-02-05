const express = require("express");
const app = express();
const port = 3001;
const host = "0.0.0.0";

// routes
app.use("/", require("./config/routes"));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

const express = require("express");
const app = express();
const port = 3001;
const host = "0.0.0.0";
const path = require("path");
const layout = require("express-ejs-layouts");

// templates
app.use(layout);
app.set("views", path.join(__dirname, "app/views"));
app.set("layout", "layouts/application");
app.set("view engine", "ejs");

// static file
app.use(express.static(__dirname + "/public"));

// routes
app.use("/", require("./config/routes"));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

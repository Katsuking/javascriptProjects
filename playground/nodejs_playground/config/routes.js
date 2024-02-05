const express = require("express");
const router = express.Router();

// controllers
const pages = new (require("../app/controller/pages"))();
const auth = new (require("../app/controller/auth"))();

router.get("/", pages.welcome);
router.get("/login", auth.login);
router.get("/register", auth.register); // register methodを実行する

module.exports = router;

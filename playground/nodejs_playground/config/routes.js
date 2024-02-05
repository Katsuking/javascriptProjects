const express = require("express");
const router = express.Router();

// controllers
const pages = new (require("../app/controller/pages"))();

router.get("/", pages.welcome);

module.exports = router;

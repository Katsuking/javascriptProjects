class PagesController {
  // callback handler
  welcome(req, res, next) {
    if (!req.user) {
      return res.send("Hello, my homie");
      // return res.render("pages/welcome");
    }
    next();
  }
}

module.exports = PagesController;

var express = require("express");
var router = express.Router();
var login = require("../../config");
var locus = require("locus");
//root route
router.get("/", function(req, res) {
  // res.sendFile(path.join(__dirname, "/public", "index.html"));
  res.render("login");
});

router.get("/login", function(req, res) {
  if (
    req.query.username === login.admin.username &&
    req.query.password === login.admin.password
  )
    res.render("index");
});
module.exports = router;

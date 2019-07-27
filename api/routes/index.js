var express = require("express");
var router = express.Router();

//root route
router.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "/public", "index.html"));
});

module.exports = router;

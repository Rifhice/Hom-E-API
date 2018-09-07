var express = require("express");
const router = express.Router();

router.get("/", function(req, res) {
  console.log(req.body);
  res.send("hey");
});

router.post("/", function(req, res) {
  res.send("hey");
});

module.exports = router;

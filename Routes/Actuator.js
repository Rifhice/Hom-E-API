var express = require("express");
const router = express.Router();
const RequestFormatter = require("./RequestFormatter");
const Authentificator = require("./Authentificator");

router.get("/", function(req, res) {
  res.send("hey");
});

router.get("/:id", function(req, res) {});

router.post("/", function(req, res) {
  Authentificator.checkAut(req.token, res)
    .then(result => {
      console.log(RequestFormatter.format(req));
      res.send("Actuator");
    })
    .catch(err => console.log(err));
});

router.delete("/:id", function(req, res) {});

router.put("/:id", function(req, res) {});

module.exports = router;

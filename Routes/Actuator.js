var express = require("express");
const router = express.Router();
const RequestFormatter = require("./RequestFormatter");
const Authentificator = require("./Authentificator");

router.get("/", function(req, res) {});

router.get("/:id", function(req, res) {});

router.post("/", function(req, res) {
  Authentificator.checkAut(false, res).then(result => {
    console.log(RequestFormatter.format(req));
    res.send("Actuator");
  });
});

router.delete("/:id", function(req, res) {});

router.put("/:id", function(req, res) {});

module.exports = router;

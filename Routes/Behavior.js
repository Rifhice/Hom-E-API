var express = require("express");
const router = express.Router();
const RequestTransferrer = require("./RequestTranferrer");

router.get("/:device", function(req, res) {
  RequestTransferrer.tranfer(req, res);
});

router.get("/:device/:id", function(req, res) {
  RequestTransferrer.tranfer(req, res);
});

router.post("/:device", function(req, res) {
  RequestTransferrer.tranfer(req, res);
});

router.delete("/:device/:id", function(req, res) {
  RequestTransferrer.tranfer(req, res);
});

router.put("/:device/:id", function(req, res) {
  RequestTransferrer.tranfer(req, res);
});

module.exports = router;

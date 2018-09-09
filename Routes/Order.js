var express = require("express");
const router = express.Router();
const RequestTransferrer = require("./RequestTranferrer");

router.post("/:device", function(req, res) {
  RequestTransferrer.tranfer(req, res);
});

module.exports = router;

var express = require("express");
const router = express.Router();
const RequestTransferrer = require("./RequestTranferrer");

router.get("/:device", function(req, res) {
  RequestTransferrer.tranfer(req, res);
});

module.exports = router;

var express = require("express");
const router = express.Router();
const RequestFormatter = require("./RequestFormatter");
const Authentificator = require("./Authentificator");

router.get("/:device", function(req, res) {
  if (!global.connectedSockets["6a50-3ce8-4797-4bcb-0213-bfe6-06cc-5504"])
    res.send({
      code: 400,
      message: "No device related to the user is currently connected !"
    });
  else if (
    !global.connectedSockets["6a50-3ce8-4797-4bcb-0213-bfe6-06cc-5504"][
      req.params.device
    ]
  )
    res.send({
      code: 400,
      message: "The requested device is not currently connected !"
    });
  else {
    global.connectedSockets["6a50-3ce8-4797-4bcb-0213-bfe6-06cc-5504"][
      req.params.device
    ].emit("Actuator", RequestFormatter.format(req), value =>
      console.log(value)
    );

    res.send("hey");
  }
});

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

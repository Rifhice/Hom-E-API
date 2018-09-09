var express = require("express");

const router = express.Router();

router.use("/Login", require("./Routes/Login"));

router.use("/Actuator", require("./Routes/Actuator"));
router.use("/Behavior", require("./Routes/Behavior"));
router.use("/Sensor", require("./Routes/Sensor"));
router.use("/Order", require("./Routes/Order"));
router.use("/EnvironmentVariable", require("./Routes/EnvironmentVariable"));
//router.use("/Command", require("./Routes/Command"));
//router.use("/ComplexCommand", require("./Route/ComplexCommand"));

module.exports = router;

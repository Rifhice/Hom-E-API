var express = require("express");

const router = express.Router();

router.use("/Actuator", require("./Routes/Actuator"));
router.use("/Login", require("./Routes/Login"));
router.use("/Behavior", require("./Routes/Behavior"));
router.use("/Sensor", require("./Routes/Sensor"));
router.use("/Action_queue", require("./Routes/Action_queue"));
router.use("/Command", require("./Routes/Command"));
router.use("/EnvironmentVariable", require("./Routes/EnvironmentVariable"));
//router.use("/ComplexCommand", require("./Route/ComplexCommand"));

module.exports = router;

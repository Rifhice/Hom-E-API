const express = require("express");
const DeviceSocket = require("./DeviceSocket");
const WEBSocket = require("./WebSocket");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const Logger = require("./Logger");
const cfg = require("./config.json");
const bearerToken = require("express-bearer-token");
const REST_PORT = process.env.PORT || cfg.REST_PORT;
const DEVICE_SOCKET_IO_PORT = cfg.DEVICE_SOCKET_IO_PORT;
const WEB_SOCKET_IO_PORT = cfg.WEB_SOCKET_IO_PORT;

app.get("/", function(req, res) {
  res.send("Hi there !");
});

app.use(bearerToken());
app.use(cors());
app.use(bodyParser.json());
app.all("*", (req, res, next) => {
  Logger(
    `${req.protocol.toUpperCase()} ${req.method} ${req.get("host")}${
      req.originalUrl
    } ${req.body}`,
    { channel: "rest" }
  );
  next();
});
app.use("/", require("./router.js"));

app.listen(REST_PORT, "0.0.0.0", function() {
  Logger("Rest api listening on port " + REST_PORT + " !", {
    channel: "rest"
  });
});

DeviceSocket.listen(DEVICE_SOCKET_IO_PORT);
Logger("Device Socket IO listening on port " + DEVICE_SOCKET_IO_PORT + " !", {
  channel: "device"
});

WEBSocket.listen(WEB_SOCKET_IO_PORT);
Logger("UI Socket IO listening on port " + WEB_SOCKET_IO_PORT + " !", {
  channel: "ui"
});

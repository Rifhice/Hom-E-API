const express = require("express");
const UserSocket = require("./UserSocket");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const Logger = require("./Logger");
const cfg = require("./config.json");
const bearerToken = require("express-bearer-token");
const REST_PORT = process.env.PORT || cfg.REST_PORT;
const SOCKET_IO_PORT = cfg.SOCKET_IO_PORT;

app.get("/", function(req, res) {
  res.send("Hi there !");
});

app.use(bearerToken());
app.use(cors());
app.use(bodyParser.json());
app.use("/", require("./router.js"));

app.listen(REST_PORT, "0.0.0.0", function() {
  Logger("Example app listening on port " + REST_PORT + " !");
});

UserSocket.listen(SOCKET_IO_PORT);
Logger("User Socket IO listening on port " + SOCKET_IO_PORT + " !");

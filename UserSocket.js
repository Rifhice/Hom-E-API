var io = require("socket.io")();
const Logger = require("./Logger");
io.on("connection", function(client) {
  Logger("New UI connected");
  client.on("disconnect", function() {
    Logger("UI disconnected");
  });
  client.on("register action_queue", msg => {
    Logger(`Received ${msg}`);
  });
  client.on("register actuator", msg => {
    Logger(`Received ${msg}`);
  });
  client.on("register sensor", msg => {
    Logger(`Received ${msg}`);
  });
  client.on("register command", msg => {
    Logger(`Received ${msg}`);
  });
  client.on("register behavior", msg => {
    Logger(`Received ${msg}`);
  });
  client.on("register environment_variable", msg => {
    Logger(`Received ${msg}`);
  });
});

module.exports = io;

var io = require("socket.io")();
const Logger = require("./Logger");
global.connectedSockets = {};
io.on("connection", function(client) {
  Logger("New device connected !");

  client.on("disconnect", function() {
    for (user in global.connectedSockets) {
      for (device in global.connectedSockets[user]) {
        if (global.connectedSockets[user][device] == client) {
          delete global.connectedSockets[user];
        }
      }
    }
    Logger("Device just disconnected !");
  });

  client.on("register", msg => {
    if (msg && msg.userId && msg.deviceId) {
      let userId = msg.userId,
        deviceId = msg.deviceId;

      if (global.connectedSockets[userId])
        global.connectedSockets[userId][deviceId] = client;
      else global.connectedSockets[userId] = { [deviceId]: client };

      client.emit("register", { code: 200 });
    } else {
      client.emit("register", { code: 400 });
    }
  });

  client.on("register environment_variable", msg => {
    Logger(`Received ${msg}`);
  });
});

module.exports = io;

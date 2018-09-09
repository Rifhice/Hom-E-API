var io = require("socket.io")();
const Logger = require("./Logger");
const JWT = require("./Security/JWT");
const Authentificator = require("./Security/Authentificator");

global.connectedSockets = {};
io.on("connection", function(client) {
  Logger("New device connected !", { channel: "device" });

  client.on("disconnect", function() {
    for (user in global.connectedSockets) {
      for (device in global.connectedSockets[user]) {
        if (global.connectedSockets[user][device] == client) {
          delete global.connectedSockets[user];
        }
      }
    }
    if (global.registeredSocket[client.deviceId]) {
      for (let channel in global.registeredSocket[client.deviceId]) {
        for (let socket of global.registeredSocket[client.deviceId][channel]) {
          socket.emit("unsubscribe", { channel }, () => {
            callback();
          });
        }
      }
    }
    Logger("Device just disconnected ! All the UI subscribed were warned !", {
      channel: "device"
    });
  });

  client.on("register", msg => {
    if (msg && msg.userId && msg.deviceId) {
      let userId = msg.userId,
        deviceId = msg.deviceId;

      if (global.connectedSockets[userId])
        global.connectedSockets[userId][deviceId] = client;
      else global.connectedSockets[userId] = { [deviceId]: client };

      JWT.code({ userId, deviceId })
        .then(token => {
          client.deviceId = deviceId;
          client.emit("register", { code: 200, token });
        })
        .catch(err => {
          client.emit("register", { code: 400 });
        });
    } else {
      client.emit("register", { code: 400 });
    }
  });

  client.on("update", (message, response) => {
    JWT.decode(message.token)
      .then(decoded => {
        delete message.token;
        if (
          global.registeredSocket &&
          global.registeredSocket[decoded.deviceId] &&
          global.registeredSocket[decoded.deviceId][message.channel]
        ) {
          for (let socket of global.registeredSocket[decoded.deviceId][
            message.channel
          ]) {
            socket.emit("update", message);
          }
        }
      })
      .catch(err => {
        response({ code: 400, message: "The token sent is invalid !" });
      });
  });
});

module.exports = io;

var io = require("socket.io")();
const Logger = require("./Logger");
const Authentificator = require("./Security/Authentificator");
const JWT = require("./Security/JWT");
const channel = ["Actuator"];
global.registeredSocket = {};

const subscribe = (socket, channel, callback) => {
  Logger(`${socket.id} UI just subscribed to the channel : ${channel}`, {
    channel: "ui"
  });
  socket.emit("subscribe", { channel }, () => {
    callback();
  });
};

const unsubscribe = (socket, channel, callback) => {
  Logger(`${socket.id} UI just unsubscribed to the channel : ${channel}`, {
    channel: "ui"
  });
  socket.emit("unsubscribe", { channel }, () => {
    callback();
  });
};

io.on("connection", function(client) {
  Logger(`${client.id} UI just connected !`, { channel: "ui" });

  client.on("disconnect", function() {
    if (client.subscribedChannel)
      for (let channel of client.subscribedChannel) {
        unsubscribe(channel.socket, channel.channel, res => {});
      }
    Logger(`${client.id} UI just disconnected !`, { channel: "ui" });
  });

  client.on("subscribe", (message, response) => {
    Authentificator.checkAut(message.token)
      .then(userId => {
        Authentificator.isDeviceConnected(
          global.connectedSockets,
          userId,
          message.deviceId
        )
          .then(socket => {
            if (!channel.includes(message.channel)) {
              response({
                code: 400,
                message: `Channel : ${message.channel} unknown`
              });
            } else {
              if (!global.registeredSocket[message.deviceId]) {
                global.registeredSocket[message.deviceId] = {};
              }
              global.registeredSocket[message.deviceId][message.channel]
                ? global.registeredSocket[message.deviceId][
                    message.channel
                  ].push(client)
                : (global.registeredSocket[message.deviceId][
                    message.channel
                  ] = [client]);
              client.subscribedChannel
                ? client.subscribedChannel.push({
                    channel: message.channel,
                    socket
                  })
                : (client.subscribedChannel = [
                    { channel: message.channel, socket }
                  ]);
              subscribe(socket, message.channel, () => {
                response({
                  code: 200,
                  message: `Successfully subscribed from the channel : ${
                    message.channel
                  }`
                });
              });
            }
          })
          .catch(err => {
            response({ code: err.code, message: err.message });
          });
      })
      .catch(err => {
        console.log(err);
        response({ code: err.code, message: err.message });
      });
  });

  client.on("unsubscribe", (message, response) => {
    Authentificator.checkAut(message.token)
      .then(userId => {
        Authentificator.isDeviceConnected(
          global.connectedSockets,
          userId,
          message.deviceId
        )
          .then(socket => {
            if (!channel.includes(message.channel)) {
              response({
                code: 400,
                code: `Channel : ${message.channel} unknown`
              });
            } else {
              if (
                global.registeredSocket[message.deviceId] &&
                global.registeredSocket[message.deviceId][message.channel] &&
                global.registeredSocket[message.deviceId][
                  message.channel
                ].includes(client)
              ) {
                let indexSocket = global.registeredSocket[message.deviceId][
                  message.channel
                ].indexOf(client);
                let indexChannel = client.subscribedChannel.indexOf(
                  message.channel
                );
                delete global.registeredSocket[message.deviceId][
                  message.channel
                ][indexSocket];
                delete client.subscribedChannel[indexChannel];
                unsubscribe(socket, message.channel, () => {
                  response({
                    code: 200,
                    message: `Successfully unsubscribed from the channel : ${
                      message.channel
                    }`
                  });
                });
              } else {
                response({
                  code: 400,
                  message: `You were not registered to the channel : ${
                    message.channel
                  }`
                });
              }
            }
          })
          .catch(err => {
            response({ code: err.code, message: err.message });
          });
      })
      .catch(err => {
        console.log(err);
        response({ code: err.code, message: err.message });
      });
  });
  client.on("error", err => {
    console.log(err);
  });
});

module.exports = io;

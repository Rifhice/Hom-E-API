const RequestFormatter = require("./RequestFormatter");
const Authentificator = require("./Authentificator");
const JWT = require("./JWT");
const ResponseBuilder = require("./RequestResponseBuilder");
const timeoutCallback = require("timeout-callback");
const TIMEOUT = 5000;

module.exports = {
  tranfer(req, res) {
    Authentificator.checkAut(req.token, res)
      .then(userId => {
        if (!global.connectedSockets[userId])
          ResponseBuilder.sendErr(
            res,
            400,
            "No device related to the user is currently connected !"
          );
        else if (!global.connectedSockets[userId][req.params.device])
          ResponseBuilder.sendErr(
            res,
            400,
            "The requested device is not currently connected !"
          );
        else {
          global.connectedSockets[userId][req.params.device].send(
            RequestFormatter.format(req),
            timeoutCallback(TIMEOUT, (err, response) => {
              if (err)
                ResponseBuilder.sendErr(
                  res,
                  502,
                  "The device response has timed out maybe the message didn't reach or  wasn't handle by the device !"
                );
              else {
                if (response && response.token) {
                  JWT.decode(response.token)
                    .then(token => {
                      if (
                        token &&
                        token.userId &&
                        token.deviceId &&
                        token.userId === userId &&
                        token.deviceId === req.params.device
                      ) {
                        delete response.token;
                        res.send(response);
                      } else {
                        ResponseBuilder.sendErr(
                          res,
                          502,
                          "The data in the device's token is invalid !"
                        );
                      }
                    })
                    .catch(err =>
                      ResponseBuilder.sendErr(
                        res,
                        502,
                        "The device token is invalid !"
                      )
                    );
                } else {
                  ResponseBuilder.sendErr(
                    res,
                    502,
                    "The device response is invalid -> it is unauthorized !"
                  );
                }
              }
            })
          );
        }
      })
      .catch(err => console.log(err));
  }
};

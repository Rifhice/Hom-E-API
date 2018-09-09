const RequestFormatter = require("./RequestFormatter");
const Authentificator = require("../Security/Authentificator");
const JWT = require("../Security/JWT");
const ResponseBuilder = require("./RequestResponseBuilder");
const timeoutCallback = require("timeout-callback");
const TIMEOUT = 5000;

module.exports = {
  tranfer(req, res) {
    Authentificator.checkAut(req.token, res)
      .then(userId => {
        Authentificator.isDeviceConnected(
          global.connectedSockets,
          userId,
          req.params.device
        )
          .then(socket => {
            socket.send(
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
          })
          .catch(err => {
            ResponseBuilder.sendErr(res, err.code, err.message);
          });
      })
      .catch(err => res.send(err));
  }
};

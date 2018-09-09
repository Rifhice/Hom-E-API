const jwt = require("../Security/JWT");
const DB = require("../DB/DB.js");

module.exports = {
  checkAut(token, res) {
    return new Promise((resolve, reject) => {
      jwt
        .decode(token)
        .then(decoded => {
          if (decoded && decoded.userId)
            DB.doesUserExists(decoded.userId)
              .then(result => {
                resolve(decoded.userId);
              })
              .catch(err => {
                reject({ code: 403, message: "User does not exists !" });
              });
        })
        .catch(err => reject({ code: 403, message: "Token invalid !" }));
    });
  },
  isDeviceConnected(sockets, userId, deviceId) {
    return new Promise((resolve, reject) => {
      if (!sockets[userId])
        reject({
          code: 400,
          message: "No device related to the user is currently connected !"
        });
      else if (!sockets[userId][deviceId])
        reject({
          code: 400,
          message: "The requested device is not currently connected !"
        });
      else {
        resolve(sockets[userId][deviceId]);
      }
    });
  }
};

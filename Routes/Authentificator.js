const jwt = require("./JWT.js");
const DB = require("./DB.js");

module.exports = {
  checkAut(token, res) {
    console.log(token);
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
                res.send({ code: 403, message: "User does not exists !" });
              });
        })
        .catch(err => res.send({ code: 403, message: "Token invalid !" }));
    });
  }
};

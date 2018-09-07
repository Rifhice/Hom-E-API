const jwt = require("jsonwebtoken");

const SECRET_HASH = "M3rC13STTr0pfUn";

const code = data => {
  return new Promise((resolve, reject) => {
    return jwt.sign(data, SECRET_HASH, (err, token) => {
      if (err) reject(err);
      else resolve(token);
    });
  });
};

const decode = token => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, SECRET_HASH, (err, decoded) => {
      if (err) reject(err);
      else resolve(decoded);
    });
  });
};

module.exports = { code, decode };

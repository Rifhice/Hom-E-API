const fs = require("fs");

function guid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return `${s4()}-${s4()}-${s4()}-${s4()}-${s4()}-${s4()}-${s4()}-${s4()}`;
}

var createUser = user => {
  return new Promise((resolve, reject) => {
    readUsers().then(data => {
      const uuid = guid();
      data[uuid] = user;
      fs.writeFile("./DB.json", JSON.stringify(data), err => {
        if (err) reject(err);
        else resolve(uuid);
      });
    });
  });
};

var readUsers = () => {
  return new Promise((resolve, reject) => {
    fs.readFile("./DB.json", JSON.stringify(user), (err, data) => {
      if (err) reject(err);
      else resolve(data);
    });
  });
};

var getUserWithGoogleID = userId => {
  return new Promise((resolve, reject) => {
    readUsers()
      .then(users => {
        for (user in users) {
          if (users[user].googleId === userId) {
            let res = { ...users[user] };
            res.userId = user;
            resolve(res);
          }
        }
        reject();
      })
      .catch(err => console.log(err));
  });
};

var doesUserExists = userId => {
  return new Promise((resolve, reject) => {
    readUsers()
      .then(users => {
        if (users[userId]) resolve();
        else reject();
      })
      .catch(err => console.log(err));
  });
};
createUser({ googleId: "105798007328638690051", faceboookId: "id" });
createUser({ googleId: "id", faceboookId: "id" });
module.exports = {
  getUserWithGoogleID,
  doesUserExists,
  createUser,
  readUsers
};

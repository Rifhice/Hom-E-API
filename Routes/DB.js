var db = {
  "1": { googleId: "105798007328638690051", faceboookId: "id" },
  "2": { googleId: "id", faceboookId: "id" }
};

var getUserWithGoogleID = userId => {
  return new Promise((resolve, reject) => {
    for (user in db) {
      if (db[user].googleId === userId) {
        let res = { ...db[user] };
        res.userId = user;
        resolve(res);
      }
    }
    reject();
  });
};

var doesUserExists = userId => {
  return new Promise((resolve, reject) => {
    if (db[userId]) resolve();
    else reject();
  });
};

module.exports = { getUserWithGoogleID, doesUserExists };

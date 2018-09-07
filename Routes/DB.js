var db = {
  "1": { googleId: "105798007328638690051", faceboookId: "id" },
  "2": { googleId: "id", faceboookId: "id" }
};

var getUserWithGoogleID = userId => {
  return new Promise((resolve, reject) => {
    for (user of db) {
      if (db[user].googleId === userId) {
        resolve(db[user]);
      }
    }
    reject();
  });
};

module.exports = { getUserWithGoogleID };

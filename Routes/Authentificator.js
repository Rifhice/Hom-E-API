module.exports = {
  checkAut(token, res) {
    return new Promise((resolve, reject) => {
      if (token) {
        resolve();
      } else {
        res.send({ code: 403 });
        reject();
      }
    });
  }
};

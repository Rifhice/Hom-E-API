module.exports = {
  sendErr(res, code, message) {
    res.send({ code, message });
  }
};

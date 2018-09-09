module.exports = {
  format(req) {
    return {
      //protocol: req.protocol,
      //host: req.get("host"),
      origin: req.originalUrl.split("/")[1],
      originalUrl: req.originalUrl,
      method: req.method,
      body: req.body
    };
  }
};

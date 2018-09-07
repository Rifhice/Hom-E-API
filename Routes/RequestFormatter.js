module.exports = {
  format(req) {
    return {
      protocol: req.protocol,
      host: req.get("host"),
      originalUrl: req.originalUrl,
      method: req.method,
      body: req.body
    };
  }
};

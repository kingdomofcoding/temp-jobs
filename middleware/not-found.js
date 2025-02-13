const notFoundMiddleware = (req, res) => {
  return res.status(404).send(`Page Not Found`);
};

module.exports = notFoundMiddleware;

const { UnauthenticatedError } = require("../errors");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const authenticationMiddleware = async (req, res, next) => {
  const authHeaders = req.headers.authorization;
  if (!authHeaders || !authHeaders.startsWith("Bearer ")) {
    throw new UnauthenticatedError("token not exists");
  }
  const token = authHeaders.split(" ")[1];

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const user = User.findById(decodedToken.id).select("-password");

    req.user = { name: decodedToken.name, userId: decodedToken.userId };
    next();
  } catch (err) {
    throw new UnauthenticatedError("token not verified");
  } //s
};
module.exports = authenticationMiddleware;

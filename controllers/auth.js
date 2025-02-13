const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, UnauthenticatedError } = require("../errors/index");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const register = async (req, res) => {
  const user = await User.create({ ...req.body });
  res
    .status(StatusCodes.CREATED)
    .json({ user: { name: user.getName(), token: user.createJWT() } });
};
const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new BadRequestError(`Please provide email and password`);
  }
  const user = await User.findOne({ email });
  if (!user) {
    throw new UnauthenticatedError(`Invalid credentials`);
  }
  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect) {
    throw new UnauthenticatedError(`incorrect password`);
  }
  const token = user.createJWT();
  const decodedToken = req.user;
  console.log(decodedToken, "-------------------------------------");
  res.status(StatusCodes.OK).json({
    user: {
      name: decodedToken.name,
      id: decodedToken.userId,
      token: token,
    },
  });
};

module.exports = {
  register,
  login,
};
//hi

const NotFoundError = require("./not-found");
const CustomAPIError = require("./custom-api");
const BadRequestError = require("./bad-request");
const UnauthenticatedError = require("./unauthenticated");

module.exports = {
  CustomAPIError,
  BadRequestError,
  UnauthenticatedError,
  NotFoundError,
};

const { StatusCodes } = require("http-status-codes");

const errorHandlingMiddleware = async (err, req, res, next) => {
  console.log("Error Handling Middleware triggered:", err);
  let customError = {
    //set defaults
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    msg: err.message || "Something went wrong try again later",
  };
  //we will use the above codes for the rest of the code

  if (err.name === "ValidationError") {
    customError.msg = Object.values(err.errors)
      .map((item) => {
        return item.message;
      })
      .join(",");
    customError.statusCode = 400;
  }
  //err.code is mongo error
  if (err.code && err.code === 11000) {
    customError.msg = `Duplicate value entered for ${Object.keys(
      err.keyValue
    )} field, please choose another value`;
    customError.statusCode = 400;
  }
  if (err.name === "CastError") {
    customError.msg = `No item found with id: ${err.value}`;
    customError.statusCode = 404;
  }
  return res
    .status(customError.statusCode)
    .json({ msg: customError.msg, boss: "bossin" });
};

module.exports = errorHandlingMiddleware;

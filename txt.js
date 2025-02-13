class CustomAPIError {
  constructor(message) {
    this.message = message;
  }
}
class UnauthenticatedError {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.UNAUTHENTICATED;
  }
}
class BadRequest {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.BAD_REQUEST;
  }
}
const errorHandlingMiddleware = async (err, req, res) => {
  if (err instanceof CustomAPIError) {
    return res.status(err.statusCode).json({ msg: err.message });
  }
  return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ err });
};

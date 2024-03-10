class ErrorHandler extends Error {
  constructor(message, statusCode) {
    super(message);

    this.message = message || "Internal Server Error";
    this.statusCode = statusCode || 500;

    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = ErrorHandler;

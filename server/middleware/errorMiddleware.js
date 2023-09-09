const errorMiddleware = (err, req, res, next) => {
  console.log(err.statusCode, err.message, "msg");

  return res
    .status(err.statusCode)
    .json({ success: false, error: err.message });
};

module.exports = errorMiddleware;

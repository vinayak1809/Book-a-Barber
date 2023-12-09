const errorMiddleware = (err, req, res, next) => {
  if (err.message == "jwt expired") {
    return res.status(200).json({ success: false, error: err.message });
  }

  return res
    .status(err.statusCode)
    .json({ success: false, error: err.message });
};

module.exports = errorMiddleware;

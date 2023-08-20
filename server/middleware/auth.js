const catchAsyncErrors = require("./catchAsyncErros");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

exports.isAuthenticatedUser = catchAsyncErrors(async (req, res, next) => {
  const cookieHeader = req.headers.cookie; // Get the cookie header from request headers

  if (cookieHeader) {
    // Split the cookie header by semicolon to get individual cookie strings
    const cookies = cookieHeader.split(";");

    // Find the cookie that starts with "token="
    const tokenCookie = cookies.find((cookie) =>
      cookie.trim().startsWith("token=")
    );

    if (tokenCookie) {
      // Extract the token value from the "token" cookie
      const token = tokenCookie.split("=")[1].trim();

      if (!token) {
        return next(
          new ErrorHander("Please Login to access this resource", 401)
        );
      }

      const decodedData = jwt.verify(token, process.env.JWT_SECRET);

      req.user = await User.findById(decodedData.id);
      req.token = token;
    }
  }

  next();
});

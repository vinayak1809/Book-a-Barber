const catchAsyncErrors = require("../middleware/catchAsyncErros");
const ErrorHandler = require("../utils/errorHandler");
const sendtoken = require("./../utils/jwtToken");

const User = require("../models/user");

const registerUser = catchAsyncErrors(async (req, res, next) => {
  try {
    const user = new User({ ...req.body });
    await user.save();

    res.status(201).json({ user: user, success: true });
  } catch (err) {
    return next(new ErrorHandler(err.message, 500));
  }
});

const updateUser = catchAsyncErrors(async (req, res, next) => {
  try {
    const user = await User.findOneAndUpdate(
      { _id: req.user._id },
      { ...req.body },
      { new: true }
    );

    res.status(201).json({ user: user, success: true });
  } catch (err) {
    return next(new ErrorHandler(err.message, 500));
  }
});

const checkLoginDetails = catchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email: email }).select("+password");

    if (!user) {
      return next(new ErrorHandler("User not found", 400));
    }

    const isPasswordMatched = await user.comparePassword(password);

    if (!isPasswordMatched) {
      return next(new ErrorHandler("Password incorrect", 401));
    }

    sendtoken(user, 200, res);
  } catch (err) {
    return next(new ErrorHandler(err.message, 500));
  }
});

const checkForUser_Token = catchAsyncErrors(async (req, res, next) => {
  try {
    if (!req.token) {
      return next(new ErrorHandler("token doesn't exist ", 401));
    }
    return res
      .status(200)
      .json({ user: req.user, success: true, token: req.token });
  } catch (err) {
    return next(new ErrorHandler(err.message, 500));
  }
});

const logout = catchAsyncErrors(async (req, res, next) => {
  res.cookie("token", "", {
    httpOnly: true,
    expires: new Date(0),
    secure: true,
    sameSite: "none",
  });
  res.json({
    user: { role: "" },
    token: "",
    success: false,
    msg: "Logged out Successfully.",
  });
});

module.exports = {
  registerUser,
  updateUser,
  checkLoginDetails,
  checkForUser_Token,
  logout,
};

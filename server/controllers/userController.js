const catchAsyncErros = require("../middleware/catchAsyncErros");
const User = require("../models/user");
const Appointment = require("../models/Appointments");
const sendtoken = require("./../config/jwtToken");

const registerUser = catchAsyncErros(async (req, res, next) => {
  const user = new User({ ...req.body });
  user.save();

  res.status(201).json({ user: user, success: true });
});

const checkLoginDetails = catchAsyncErros(async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email: email }).select("+password");

  const isPasswordMatched = await user.comparePassword(password);

  if (!isPasswordMatched) {
    res.status(400).json({ success: false, message: "Password incorrect" });
  }

  sendtoken(user, 200, res);
});

const checkForUser_Token = catchAsyncErros(async (req, res, next) => {
  if (!req.token) {
    res.status(200).json({ user: { role: "" }, success: false, token: "" });
  }
  res.status(200).json({ user: req.user, success: true, token: req.token });
});

const getUserAppointments = catchAsyncErros(async (req, res) => {
  const userID = req.user._id;
  const orders = await Appointment.find({ userId: userID });

  res.status(200).json({ orders: orders, success: true });
});

const logout = catchAsyncErros(async (req, res, next) => {
  res
    .cookie("token", "", {
      httpOnly: true,
      expires: new Date(0),
      secure: true,
      sameSite: "none",
    })
    .json({
      user: { role: "" },
      token: "",
      success: false,
      msg: "Logged out Successfully.",
      orders: [],
    });
});

module.exports = {
  registerUser,
  checkLoginDetails,
  checkForUser_Token,
  getUserAppointments,
  logout,
};

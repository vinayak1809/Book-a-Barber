const catchAsyncErros = require("../middleware/catchAsyncErros");
const User = require("../models/user");
const Appointment = require("../models/Appointments");
const sendtoken = require("./../config/jwtToken");

const registerUser = catchAsyncErros(async (req, res, next) => {
  const user = new User({ ...req.body });
  user.save();
  return true;
});

const checkUser = catchAsyncErros(async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email: email });

  const isPasswordMatched = await user.comparePassword(password);

  if (!isPasswordMatched) {
    console.log("not match password");
    return;
  }

  sendtoken(user, 200, res);
});

const checkForUser_Token = catchAsyncErros(async (req, res, next) => {
  if (!req.token) {
    res.json({ user: { role: "" }, success: false, token: "" });
  }
  res.json({ user: req.user, success: true, token: req.token });
});

const getUserOrders = catchAsyncErros(async (req, res) => {
  const userID = req.user._id;
  const orders = await Appointment.find({ userId: userID });

  res.json({ orders: orders, success: true });
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
    });
});

module.exports = {
  registerUser,
  checkUser,
  checkForUser_Token,
  getUserOrders,
  logout,
};

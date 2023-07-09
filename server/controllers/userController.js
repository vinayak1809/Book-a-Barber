const User = require("../models/user");

const registerUser = async (req, res, next) => {
  const user = new User({ ...req.body });
  user.save();
  return true;
  //const user = await User.create();
};

//bcrypt setup then rest of ui

const checkUser = async (req, res, next) => {
  const { email, password } = req.body;
  User.find({ email: email }).then((user) => {
    res.json(user[0]);
  });
};

module.exports = { registerUser, checkUser };

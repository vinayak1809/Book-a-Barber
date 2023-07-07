const User = require("../models/user");

export const registerUser = async (req, res, next) => {
  console.log(req, "userDetails");
  const user = await User.create();
};

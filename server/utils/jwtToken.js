const sendToken = async (user, statusCode, res) => {
  const token = await user.getJWTToken();

  const options = {
    expires: new Date(Date.now() + 60 * 24 * 3600000),
    httpOnly: true,
    secure: true,
    sameSite: "none",
  };

  const newObj = { ...user };
  delete newObj._doc.password;

  res
    .status(statusCode)
    .cookie("token", token, options)
    .json({ success: true, user: newObj._doc, token: token });
};

module.exports = sendToken;

const sendToken = (user, statusCode, res) => {
  const token = user.getJWTToken();

  const options = {
    expires: new Date(Date.now() + 60 * 24 * 3600000),
    httpOnly: true,
    secure: true,
    sameSite: "none",
  };

  res
    .status(statusCode)
    .cookie("token", token, options)
    .json({ success: true, user: user, token: token });
};

module.exports = sendToken;

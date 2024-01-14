const sendToken = (res, user, message, statusCode) => {
  const token = user.getJWTToken();
  const options = {
    expires: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000),
    secure: true,
    httpOnly: true,
    sameSite: "None",
  };
  res.status(201).cookie("token", token, options).json({
    success: true,
    message,
    user,
    token,
  });
};

module.exports = sendToken;

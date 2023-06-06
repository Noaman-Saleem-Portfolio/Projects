const bcrypt = require("bcryptjs");

// Create Token and saving in cookie

const sendToken = async (user, statusCode, res, req) => {
  const token = user.getJWTToken();

  // options for cookie
  // const options = {
  //   expires: new Date(
  //     Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
  //   ),
  //   httpOnly: true,
  // };

  //response with Cookie Token
  // res.status(statusCode).cookie("token", token, options).json({
  //   success: true,
  //   user,
  //   token,
  // });

  //response without Cookie Token
  res.status(statusCode).json({
    success: true,
    user,
    token,
  });
};

module.exports = sendToken;

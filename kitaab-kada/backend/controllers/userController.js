const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const User = require("../models/userModel");
const sendToken = require("../utils/jwtToken");

// Register a User
exports.registerUser = catchAsyncErrors(async (req, res, next) => {
  // const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
  //   folder: "avatars",
  //   width: 150,
  //   crop: "scale",
  // });

  console.log(req.body);
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return next(
      new ErrorHander("Provide all fields inorder to register new account", 400)
    );
  }

  const foundUser = await User.findOne({ email });

  if (foundUser) {
    return next(new ErrorHander("Email already exists!", 400));
  }

  const user = await User.create({
    name,
    email,
    password,
  });

  //201 created
  sendToken(user, 201, res, req);
});

// Login User
exports.loginUser = catchAsyncErrors(async (req, res, next) => {
  console.log("Login Controller :", req.body);
  const { email, password } = req.body;

  // checking if user has given password and email both

  if (!email || !password) {
    return next(new ErrorHander("Please Enter Email & Password", 400));
  }

  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return next(new ErrorHander("Invalid email or password", 401));
  }

  const isPasswordMatched = await user.comparePassword(password);

  if (!isPasswordMatched) {
    return next(new ErrorHander("Invalid email or password", 401));
  }

  sendToken(user, 201, res, req);
});

// Logout User
exports.logout = catchAsyncErrors(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    message: "Logged Out",
  });
});

const { bookSchema } = require("../models/joiSchema");
const ErrorHander = require("../utils/errorhander");

module.exports.validateBook = async (req, res, next) => {
  // console.log("In ValidateBook middleware!");

  //   req.body.price = parseInt(req.body.price);
  //   req.body.stock = parseInt(req.body.stock);
  // console.log(req.body);
  const { error } = await bookSchema.validate(req.body);
  if (error) {
    const msg = error.details.map((el) => el.message).join(",");
    // const msg = error;
    // const msg = "War gaye";
    return next(new ErrorHander(msg, 404));
  } else {
    next();
  }
};

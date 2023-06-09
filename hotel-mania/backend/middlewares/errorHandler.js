const { ValidationError } = require("joi");

const errorHandler = (error, req, res, next) => {
  //default error

  //   500 Internal Server Error
  // The server has encountered a situation it does not know how to handle.
  let status = 500;
  let data = {
    message: "internal Server Error",
  };

  if (error instanceof ValidationError) {
    //     401 Unauthorized
    // Although the HTTP standard specifies "unauthorized", semantically this response means "unauthenticated". That is, the client must authenticate itself to get the requested response.

    console.log(`Validation Error == ${error}`);
    // console.log(error);
    if (
      error.details[0].message === '"confirmPassword" must be [ref:password]'
    ) {
      // console.log(`Confirm Password error!!!`);
      status = 400;
      data.message = "Confirm Password field must match the password field";

      return res.status(status).json(data);
    } else {
      // console.log(`All other errors!!!!`);
      status = 400;
      data.message = error.message;

      return res.status(status).json(data);
    }
  }

  if (error.status) {
    status = error.status;
  }

  if (error.message) {
    data.message = error.message;
  }

  // console.log(`data = ${data.message}`);

  return res.status(status).json(data);
};

module.exports = errorHandler;

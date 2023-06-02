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
    status = 401;
    data.message = error.message;
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

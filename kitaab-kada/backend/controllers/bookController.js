const Book = require("../models/bookModel");
const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
// const ApiFeatures = require("../utils/apifeatures");
// const cloudinary = require("cloudinary");

// Get All Books
exports.getAllBooks = catchAsyncErrors(async (req, res, next) => {
  let query;
  console.log("i am in backend");
  // Copy req.query
  const reqQuery = { ...req.query };
  console.log(reqQuery);

  //If title is present use regex operator to find all books having this text string in their title
  if (reqQuery.title) {
    reqQuery.title = {
      $regex: reqQuery.title,
      $options: "i",
    };
  }

  // Fields to exclude
  const removeFields = ["select", "sort", "page", "limit"];

  // Loop over removeFields and delete them from reqQuery
  removeFields.forEach((param) => delete reqQuery[param]);

  // Create query string
  let queryStr = JSON.stringify(reqQuery);

  // Create operators ($gt, $gte, etc)
  queryStr = queryStr.replace(
    /\b(gt|gte|lt|lte|in)\b/g,
    (match) => `$${match}`
  );

  console.log("execution");

  const parsedQueryStr = JSON.parse(queryStr);

  // if (parsedQueryStr.priceRange !== undefined) {
  //   // console.log("Nomi", typeof parsedQueryStr.priceRange.$lte);
  //   parsedQueryStr.priceRange.$gte = parseInt(parsedQueryStr.priceRange.$gte);
  //   parsedQueryStr.priceRange.$lte = parseInt(parsedQueryStr.priceRange.$lte);
  // }

  console.log(parsedQueryStr);

  // Finding resource...
  query = Book.find(parsedQueryStr);

  const totalDocuments = await Book.find(JSON.parse(queryStr)).countDocuments();
  console.log("totalDocuments : ", totalDocuments);
  // console.log(typeof totalDocuments);

  // ********************* Pagination of The Full Stack Junkie **************************************************************

  const page = parseInt(req.query.page) || 1;
  const pageSize = parseInt(req.query.limit) || 4;
  const skip = (page - 1) * pageSize;
  // const total = await Book.countDocuments();

  let pages = 1;

  //Avoiding 0/0 in mathematics
  if (totalDocuments !== 0) {
    pages = Math.ceil(totalDocuments / pageSize);
  }

  console.log("Pages : ", pages);

  query = query.skip(skip).limit(pageSize);

  if (page > pages) {
    return res.status(404).json({
      success: false,
      message: "No page found",
    });
  }

  // // Executing query
  const books = await query;

  // console.log(books.length);

  //Setting pagination button count in case of lower number of results
  // if (books.length < parseInt(req.query.limit)) {
  //   pages = Math.ceil(books.length / pageSize);
  // }

  // ********************* Pagination of The Full Stack Junkie **************************************************************

  // ********************* Pagination of Brag **************************************************************

  // const x = await query.countDocuments();
  // console.log(x);

  // // Pagination
  // const page = parseInt(req.query.page, 10) || 1;
  // const limit = parseInt(req.query.limit, 10) || 200;
  // const startIndex = (page - 1) * limit;
  // const endIndex = page * limit;
  // const total = await Book.countDocuments();

  // console.log("Total :", total);

  // query = query.skip(startIndex).limit(limit);

  // // Executing query
  // const books = await query;

  // const totalReturned = books.length;

  // // Pagination result
  // const pagination = {};

  // console.log("EndIndex :", endIndex);
  // if (endIndex < total) {
  //   pagination.next = {
  //     page: page + 1,
  //     limit,
  //   };
  // }

  // if (totalReturned < endIndex) {
  //   console.log("delete next");
  //   delete pagination[next];
  // }

  // console.log("StartIndex :", startIndex);
  // if (startIndex > 0) {
  //   pagination.prev = {
  //     page: page - 1,
  //     limit,
  //   };
  // }

  // console.log("Pagination :", pagination);
  // console.log("Total Returned :", books.length);

  // ////////////////////////////////////////////////////////////
  // const books = await Book.find();

  // ********************* Pagination of Brag **************************************************************

  res.status(200).json({
    success: true,
    booksCount: totalDocuments,
    books,
    page,
    pages,
    message: "All Books Fetched for User Successfully!",
  });
});

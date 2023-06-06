const express = require("express");
const multer = require("multer");
const path = require("path");
const { validateBook } = require("../middleware/joiValidation");
// const {
//   getAllBooks,
//   createBook,
//   updateBook,
//   deleteBook,
//   getBookDetails,
//   createBookReview,
//   getBookReviews,
//   deleteReview,
//   getAdminBooks,
// } = require("../controllers/bookController");

// Storage Engin That Tells/Configures Multer for where (destination) and how (filename) to save/upload our files
const storage = multer.diskStorage({
  destination: "./backend/public/images/books",
  filename: function (req, file, cb) {
    return cb(null, Date.now() + "-" + file.originalname);
  },
});

// The Multer Middleware that is passed to routes that will receive income requests with file data (multipart/formdata)
// You can create multiple middleware each with a different storage engine config so save different files in different locations on server
const upload = multer({ storage: storage });

const {
  getAllBooksAdmin,
  createBookAdmin,
  deleteBook,
  updateBook,
  getBookDetails,
} = require("../controllers/bookControllerAdmin");
// const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

const router = express.Router();

//Get all books
router.route("/admin/books").get(getAllBooksAdmin);
// router
//   .route("/admin/products")
//   .get(isAuthenticatedUser, authorizeRoles("admin"), getAdminProducts);

//Create new book
router.route("/admin/book/new").post(upload.single("image"), createBookAdmin);
// router
//   .route("/admin/product/new")
//   .post(isAuthenticatedUser, authorizeRoles("admin"), createProduct);

//Delete and Update a book
router
  .route("/admin/book/:id")
  .delete(deleteBook)
  .put(upload.single("image"), updateBook);
// router
//   .route("/admin/product/:id")
//   .put(isAuthenticatedUser, authorizeRoles("admin"), updateProduct)
//   .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteProduct);

router.route("/admin/book/:id").get(getBookDetails);
// router.route("/product/:id").get(getProductDetails);

// router.route("/review").put(isAuthenticatedUser, createProductReview);

// router
//   .route("/reviews")
//   .get(getProductReviews)
//   .delete(isAuthenticatedUser, deleteReview);

module.exports = router;

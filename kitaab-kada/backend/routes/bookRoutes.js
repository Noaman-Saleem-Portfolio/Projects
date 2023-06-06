const express = require("express");
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

const { getAllBooks } = require("../controllers/bookController");
const { isAuthenticatedUser } = require("../middleware/auth");
// const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

const router = express.Router();

router.route("/books").get(getAllBooks);
// router
//   .route("/products")
//   .get(isAuthenticatedUser, authorizeRoles("admin"), getAdminProducts);

// router
//   .route("/product/new")
//   .post(isAuthenticatedUser, authorizeRoles("admin"), createProduct);

// router
//   .route("/admin/product/:id")
//   .put(isAuthenticatedUser, authorizeRoles("admin"), updateProduct)
//   .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteProduct);

// router.route("/product/:id").get(getProductDetails);

// router.route("/review").put(isAuthenticatedUser, createProductReview);

// router
//   .route("/reviews")
//   .get(getProductReviews)
//   .delete(isAuthenticatedUser, deleteReview);

module.exports = router;

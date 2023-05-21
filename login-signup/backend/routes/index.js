const express = require("express");
const authController = require("../controller/authController");

const router = express.Router();

//user

//register
router.post("/register", authController.register);

module.exports = router;

const express = require("express");
const authController = require("../controller/authController");
const auth = require("../middlewares/auth");
const hotelController = require("../controller/hotelController");

const router = express.Router();

//user

//register
router.post("/register", authController.register);

//login
router.post("/login", authController.login);

//logout
router.post("/logout", auth, authController.logout);

//refresh
router.get("/refresh", authController.refresh);

//*****************************************************
//*****************************************************
//*****************************************************

//create new hotel
router.post("/hotel/new", hotelController.create);

//get all hotels
router.get("/hotel/all", hotelController.getAll);

//get hotel by id
router.get("/hotel/:id", hotelController.getById);

//update hotel
router.put("/hotel", hotelController.update);

//delete hotel
router.delete("/hotel/:id", hotelController.delete);

module.exports = router;

const express = require("express");
const authController = require("../controller/authController");
const auth = require("../middlewares/auth");
const hostelController = require("../controller/hostelController");

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

//**************************************************************************************************************
//**************************************************************************************************************
//**************************************************************************************************************
//**************************************************************************************************************
//**************************************************************************************************************
//**************************************************************************************************************

//create new hostel
router.post("/hostel/new", hostelController.create);

//get all hostels
router.get("/hostel/all", hostelController.getAll);

//get hostel by id
router.get("/hostel/:id", hostelController.getById);

//update hostel
router.put("/hostel", hostelController.update);

//delete hostel
router.delete("/hostel/:id", hostelController.delete);

module.exports = router;

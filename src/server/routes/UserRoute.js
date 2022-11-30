const bcrypt = require("bcrypt");
const express = require("express");
const { logIn, signUp, updateRides, deleteRides, getUserRides, getUserByIDs, updateUserByID } = require("../controllers/UserController");

//Initializing router and connecting database endpoints to database functions
const router = express.Router();

router.post("/signup", signUp);

router.post("/login", logIn);

router.post("/update-user-rides-by-id", updateRides);

router.post("/remove-user-rides-by-id", deleteRides);

router.post("/getAllRides", getUserRides);

router.post("/get-users-by-ids", getUserByIDs);

router.post("/update-user-by-id", updateUserByID);

module.exports = router;
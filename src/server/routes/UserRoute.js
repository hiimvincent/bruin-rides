const bcrypt = require("bcrypt");
const express = require("express");
const { logIn, signUp, updateRides, getUserRides, getUserByIDs, updateUserByID } = require("../controllers/UserController");


const router = express.Router();

router.post("/signup", signUp);

router.post("/login", logIn);

router.post("/update-user-rides-by-id", updateRides)

router.post("/getAllRides", getUserRides)

router.post("/get-users-by-ids", getUserByIDs)

router.post("/update-user-by-id", updateUserByID)

module.exports = router;
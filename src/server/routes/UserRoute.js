const bcrypt = require("bcrypt");
const express = require("express");
const { logIn, signUp, updateRides, getUserRides } = require("../controllers/UserController");


const router = express.Router();

router.post("/signup", signUp);

router.post("/login", logIn);

router.post("/update-user-rides-by-id", updateRides)

router.post("/getAllRides", getUserRides)

module.exports = router;
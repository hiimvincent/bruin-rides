const bcrypt = require("bcrypt");
const express = require("express");
const { logIn, signUp, updateRides } = require("../controllers/UserController");


const router = express.Router();

router.post("/signup", signUp);

router.post("/login", logIn);

router.post("/update-user-rides-by-id", updateRides)

module.exports = router;
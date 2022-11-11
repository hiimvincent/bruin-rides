const bcrypt = require("bcrypt");
const express = require("express");
const { logIn, signUp } = require("../controllers/UserController");


const router = express.Router();

router.post("/signup", signUp);

router.post("/login", logIn);

module.exports = router;
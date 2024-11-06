// routes/signupRoutes.js
const express = require("express");
const { signUp } = require("../functions/signupFunction");

const router = express.Router();

router.post("/", signUp);

module.exports = router;
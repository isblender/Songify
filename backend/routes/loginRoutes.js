// routes/signupRoutes.js
const express = require("express");
const { login } = require("../functions/loginFunction");

const router = express.Router();

router.post("/", login);

module.exports = router;
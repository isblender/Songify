const express = require("express");
const multer = require("multer");
const cors = require("cors");
const fs = require("fs");
const { signUp } = require("../functions/signupFunction");

const router = express.Router();

router.post("/signup", signUp);

module.exports = router;

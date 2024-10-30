// const admin = require("firebase-admin");
// const db = admin.firestore();

const express = require("express");

const multer = require("multer");
const cors = require("cors");
const fs = require("fs");

const { logIn } = require("../functions/loginFunction");

const router = express.Router();

router.post("/login", logIn);
module.exports = router;

// routes/index.js
const express = require("express");
const historyRoutes = require("./historyRoutes");
const uploadRoutes = require("./uploadRoutes");
const loginRoutes = require("./loginRoutes");
const signupRoutes = require("./signupRoutes");
const deleteRoutes = require("./deleteRoutes");
const deezerRoutes = require("./deezerRoutes");

const router = express.Router();

router.use("/api/history", historyRoutes);
router.use("/api/upload",uploadRoutes);
router.use("/api/login",loginRoutes);
router.use("/api/signup", signupRoutes);
router.use("/api/delete", deleteRoutes);
router.use("/api/deezer", deezerRoutes);

module.exports = router;
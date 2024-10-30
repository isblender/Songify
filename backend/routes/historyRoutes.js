const express = require("express");
const { getUserHistory } = require("../functions/historyFunction");

const router = express.Router();

router.get("/history/:userId", getUserHistory);

module.exports = router;

const express = require("express");
const { upload } = require("../functions/uploadFunction");

const router = express.Router();

router.post("/", upload);

module.exports = router;

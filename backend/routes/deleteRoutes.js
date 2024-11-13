const express = require("express");
const { deleteConversion } = require("../functions/deleteConversionFunction");

const router = express.Router();

router.delete('/conversion/:userId/:conversionId', deleteConversion);

module.exports = router;
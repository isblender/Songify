const express = require('express');
const { getUserHistory } = require('../functions/historyController');

const router = express.Router();

router.get('/history/:userId', getUserHistory);

module.exports = router;
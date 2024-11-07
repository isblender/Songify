// routes/historyRoutes.js
const express = require("express");
const { getUserHistory } = require("../functions/historyFunction");

const router = express.Router();

router.get("/:userId", async (req, res) => {
    try {
        const history = await getUserHistory(req.params.userId);
        console.log(history);
        res.json(history);
    } catch (error) {
        console.error("Error fetching user history:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

module.exports = router;
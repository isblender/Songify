// routes/historyRoutes.js
const express = require("express");
const { getUserHistory } = require("../functions/historyFunction");

const router = express.Router();

router.get("/:userId", async (req, res) => {
    try {
        console.log(`History request received, backend fetching history of user ${req.params.userId}`);
        const history = await getUserHistory(req.params.userId);
        console.log('History successful:', history.slice(0, 20));
        res.json(history);
    } catch (error) {
        console.error("Error fetching user history:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

module.exports = router;
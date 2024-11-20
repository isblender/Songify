// routes/deezerRoutes.js
const express = require("express");
const { getRecommendedSong } = require("../functions/getSongData"); // Import the Deezer API function

const router = express.Router();

// Route to test the Deezer API function
router.get("/test", async (req, res) => {
  try {
    // Use the query parameter from the request or default to "test"
    const query = req.query.q || "test";
    console.log(`Fetching song for query: ${query}`);
    const songDetails = await getRecommendedSong(query);

    res.json({
      message: "Deezer API call successful",
      song: songDetails
    });
  } catch (error) {
    console.error("Error fetching song from Deezer:", error);
    res.status(500).json({ error: "Failed to fetch song from Deezer" });
  }
});

module.exports = router;
// /Users/isaacblender/Desktop/songify/backend/functions/getSongData.js
const axios = require("axios");

const getRecommendedSong = async (query) => {
  try {
    // Construct the URL with RapidAPI host and key
    const response = await axios.get(`https://deezerdevs-deezer.p.rapidapi.com/search`, {
      headers: {
        "x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com", // Replace with your RapidAPI host
        "x-rapidapi-key": "d16e75deeamsha53546b9562ca7ap18a35djsned2b59b17c2a", // Replace with your RapidAPI key
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.88 Safari/537.36", // Mimic a browser's user agent
        "Accept": "application/json", // Explicitly set the Accept header
      },
      params: { q: query }, // Pass the query as a parameter
    });

    if (response.data && response.data.data.length > 0) {
      const song = response.data.data[0];
      return {
        title: song.title,
        artist: song.artist.name,
        previewUrl: song.preview,
        albumCover: song.album.cover_medium,
      };
    } else {
      throw new Error("No song found from Deezer API");
    }
  } catch (error) {
    console.error("Error fetching song from Deezer:", error);
    throw error;
  }
};

module.exports = { getRecommendedSong };
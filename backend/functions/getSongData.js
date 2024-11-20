const axios = require("axios");

const getRecommendedSong = async (query) => {
  try {
    const response = await axios.get(`https://api.deezer.com/search?q=${encodeURIComponent(query)}`, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.88 Safari/537.36", // Mimic a browser's user agent
        "Accept": "application/json", // Explicitly set the Accept header
      },
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
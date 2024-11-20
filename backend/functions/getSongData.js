const axios = require('axios');
// Function to get a recommended song from Deezer's API
const getRecommendedSong = async (query) => {
  try {
    const deezerApiUrl = `https://api.deezer.com/search?q=${encodeURIComponent(query)}`;
    const response = await axios.get(deezerApiUrl);

    if (response.data && response.data.data.length > 0) {
      const song = response.data.data[0];
      return {
        title: song.title,
        artist: song.artist.name,
        previewUrl: song.preview, // 30-second preview URL
        albumCover: song.album.cover_medium, // Medium-sized album cover
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
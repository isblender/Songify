// models/Conversion.js
const mongoose = require("mongoose");

const conversionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  photo: { type: String, required: true },
  title: { type: String, required: true }, // Using title instead of songName
  artist: { type: String, required: true }, // Adding artist
  previewUrl: { type: String, required: true }, // Adding previewUrl
  albumCover: { type: String, required: true }, // Adding albumCover
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Conversion", conversionSchema);
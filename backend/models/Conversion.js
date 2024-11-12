// models/Conversion.js
const mongoose = require("mongoose");

const conversionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  photo: { type: String, required: true },
  songName: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Conversion", conversionSchema);
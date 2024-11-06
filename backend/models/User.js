// models/User.js
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  phone: { type: String, required: false },
  email: { type: String, required: true },
  password: { type: String, required: true },
  history: [{ type: mongoose.Schema.Types.ObjectId, ref: "Conversion" }],
});

module.exports = mongoose.model("User", userSchema);
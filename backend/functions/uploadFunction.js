const Conversion = require("../models/Conversion");
const User = require("../models/User");

exports.upload = async (req, res) => {
  const { userId, photoBase64, songName } = req.body;

  try {
    console.log('upload request')
    const photoBuffer = Buffer.from(photoBase64, "base64"); // Convert base64 to binary

    const newConversion = new Conversion({
      userId,
      photo: photoBuffer, // Store binary data
      songName,
    });
    await newConversion.save();

    await User.findByIdAndUpdate(userId, {
      $push: { history: newConversion._id }
    });

    res.json({ message: "Conversion saved and added to history successfully" });
  } catch (error) {
    console.error("Error saving conversion:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
const Conversion = require("../models/Conversion");
const User = require("../models/User");

exports.upload = async (req, res) => {
  const { userId, photoBase64 } = req.body;
  const songName = 'test';
  try {
    const { getIoInstance } = require("../server");
    console.log('type of io: ', typeof getIoInstance);
    console.log('upload request');

    // Check if photoBase64 is valid
    if (!photoBase64 || typeof photoBase64 !== 'string') {
      throw new TypeError('photoBase64 must be a valid Base64 string.');
    }

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

    const io = getIoInstance();
    console.log(io);

    io.to(userId).emit("refreshHistory");

    res.json({ message: "Conversion saved and added to history successfully" });
  } catch (error) {
    console.error("Error saving conversion:", error);
    console.error(photoBase64);
    res.status(500).json({ error: "Internal server error" });
  }
};
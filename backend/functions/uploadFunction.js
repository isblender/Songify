const AWS = require('aws-sdk');
const Conversion = require("../models/Conversion");
const User = require("../models/User");
const {getSongData} = require("./getSongData");

// Configure AWS
AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION // e.g., 'us-west-1'
});

const s3 = new AWS.S3();

exports.upload = async (req, res) => {
  const { userId, photoBase64 } = req.body;

  try {
    const { getIoInstance } = require("../server");
    console.log('type of io: ', typeof getIoInstance);
    console.log("Base64 Photo Length:", photoBase64.length);

    // Check if photoBase64 is valid
    if (!photoBase64 || typeof photoBase64 !== 'string') {
      throw new TypeError('photoBase64 must be a valid Base64 string.');
    }
    const photoBuffer = Buffer.from(photoBase64, "base64"); // Convert base64 to binary

    // Define S3 upload parameters
    const s3Params = {
      Bucket: 'image-to-song', // Replace with your S3 bucket name
      Key: `${userId}/${Date.now()}.jpg`, // Unique key for the image
      Body: photoBuffer,
      ContentEncoding: 'base64', // This ensures the content is correctly encoded
      ContentType: 'image/jpeg' // Adjust based on your image type
    };
    // Upload the image to S3
    const s3Response = await s3.upload(s3Params).promise();
    const imageUrl = s3Response.Location; // Get the URL of the uploaded image
    const songName ="Happy - Pharrell Williams" // get song name from the request body //
    // Get song data from Deezer API
    const deezerResponse = await getSongData(songName);
    console.log('deezerResponse: ', deezerResponse);
    const { title, artist, previewUrl, albumCover } = deezerResponse;

    // Create a new conversion record with the S3 image URL
    const newConversion = new Conversion({
      userId,
      photo: imageUrl, // Store the URL instead of binary data
      title,           // Add title from Deezer API
      artist,          // Add artist from Deezer API
      previewUrl,      // Add preview URL from Deezer API
      albumCover,      // Add album cover from Deezer API
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
    res.status(500).json({ error: "Internal server error" });
  }
};
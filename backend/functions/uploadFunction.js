const AWS = require('aws-sdk');
const Conversion = require("../models/Conversion");
const User = require("../models/User");

// Configure AWS
AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION // e.g., 'us-west-1'
});

const s3 = new AWS.S3();

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

    // Define S3 upload parameters
    const s3Params = {
      Bucket: 'image-to-song', // Replace with your S3 bucket name
      Key: `${userId}/${Date.now()}.jpg`, // Unique key for the image
      Body: photoBuffer,
      ContentEncoding: 'base64', // This ensures the content is correctly encoded
      ContentType: 'image/jpeg', // Adjust based on your image type
      ACL: 'private' // Set ACL to 'private' for security
    };

    // Upload the image to S3
    const s3Response = await s3.upload(s3Params).promise();
    const imageUrl = s3Response.Location; // Get the URL of the uploaded image

    // Create a new conversion record with the S3 image URL
    const newConversion = new Conversion({
      userId,
      photo: imageUrl, // Store the URL instead of binary data
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
    res.status(500).json({ error: "Internal server error" });
  }
};
const AWS = require('aws-sdk');
const User = require('../models/User');
const Conversion = require('../models/Conversion');

// Configure AWS
AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION, // Specify your AWS region
});

const s3 = new AWS.S3();

const deleteConversion = async (req, res) => {
  const { userId, conversionId } = req.params;

  try {
    console.log(`Attempting to delete conversion ${conversionId}`);
    // Find the conversion by ID
    const conversion = await Conversion.findById(conversionId);
    if (!conversion) {
      return res.status(404).json({ error: 'Conversion not found' });
    }
    console.log('Found conversion:', conversion);
    // Delete the image from AWS S3
    const params = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: conversion.imageUrl.split('/').pop(), // Extract the file name from the URL
    };
    console.log('Deleting image from S3:', params);
    s3.deleteObject(params, async (err, data) => {
      if (err) {
        return res.status(500).json({ error: 'Failed to delete image from S3' });
      }

      // Remove the conversion from the user's history
      await User.updateOne(
        { _id: userId },
        { $pull: { history: conversionId } }
      );
      console.log('Pulled conversion from user history');
      // Delete the conversion from the database
      await Conversion.findByIdAndDelete(conversionId);
      console.log('Deleted conversion from database');

      res.status(200).json({ message: 'Conversion and image deleted successfully' });
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'An error occurred while deleting the conversion' });
  }
};

module.exports = {deleteConversion};
// const admin = require("firebase-admin");
// const db = admin.firestore();

// exports.uploadImage = async (req, res) => {
//   try {
//     const { imageData, userId } = req.body;

//     // Process the image once we have a model
//     console.log("Image data:", imageData);

//     // Generate a song recommendation (stubbed for now)
//     const songRecommendation = {
//       title: "Song Title",
//       artist: "Song Artist",
//       link: "https://example.com/song",
//     };

//     // Store result in Firestore
//     await db.collection("userHistory").doc(userId).collection("images").add({
//       imageData,
//       songRecommendation,
//       timestamp: admin.firestore.FieldValue.serverTimestamp(),
//     });

//     res.status(200).json({ songRecommendation });
//   } catch (error) {
//     console.error("Error processing image:", error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// };
async function addConversion(userId, photoId, songName) {
    const conversion = new Conversion({
      userId,
      photo: photoId,
      songName,
    });
    await conversion.save();
  
    // Update user history
    await User.findByIdAndUpdate(userId, {
      $push: { history: conversion._id },
    });
  }
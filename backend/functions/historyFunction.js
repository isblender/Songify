const User = require("../models/User");

async function getUserHistory(userId) {
  try {
    // Find the user by ID and populate the history
    const user = await User.findById(userId).populate({
      path: "history",
      model: "Conversion",
    });

    // Check if the user exists
    if (!user) {
      throw new Error("User not found");
    }

    // Return the user's history or an empty array if it's not defined
    return user.history || [];
  } catch (error) {
    console.error("Error fetching user history:", error);
    throw error;
  }
}

module.exports = { getUserHistory };
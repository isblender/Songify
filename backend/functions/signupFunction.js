// controllers/userController.js
const User = require("../models/User");

exports.signUp = async (req, res) => {
  const { username, phone, email, password } = req.body;

  console.log("Signup Request - Username:", username, "Phone:", phone, "Email:", email);

  const profileData = { username, phone, email, password };

  try {
    // Check for existing account by phone or email
    const accountExist = await User.findOne({
      $or: [{ phone }, { email }],
    });
    const usernameExist = await User.findOne({ username });

    if (accountExist) {
      return res.json("accountExist");
    } else if (usernameExist) {
      return res.json("usernameExist");
    }

    // Create new user if no conflicts
    await User.create(profileData);
    return res.json("newUser");
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
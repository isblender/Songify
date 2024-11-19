// controllers/userController.js
const bcrypt = require("bcrypt");
const User = require("../models/User");

exports.signUp = async (req, res) => {
  const { username, phone, email, password } = req.body;

  try {
    // Check for existing account by phone or email
    const accountExist = await User.findOne({ email });
    const usernameExist = await User.findOne({ username });

    if (accountExist) {
      return res.json("accountExist");
    } else if (usernameExist) {
      return res.json("usernameExist");
    }

    // Hash the password before saving the user
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the new user with the hashed password
    const profileData = { username, phone, email, password: hashedPassword };
    await User.create(profileData);
    const user = await User.findOne({ email });

    return res.status(200).json({ message: "newUser", userId: user._id });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

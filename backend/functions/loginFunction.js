const methods = require("../mongo");
const user_collection = methods.user_collection;
const conversion_collection = methods.conversion_collection;

exports.logIn = async (req, res) => {
  try {
    const { username, phone, email, password } = req.body;

    const checkExist = await student_collection.findOne({
      username: username,
    });
    const checkMatch = await user_collection.findOne({
      email: email,
      password: password,
    });

    if (!checkExist) {
      res.json("userNotExist");
    } else if (!checkMatch) {
      res.json("userNotMatched");
    }
  } catch (error) {
    console.error("Error processing image:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// const admin = require("firebase-admin");
// const db = admin.firestore();
const methods = require("../mongo");
const user_collection = methods.user_collection;
const conversion_collection = methods.conversion_collection;

exports.signUp = async (req, res) => {
  const { username, phone, email, password } = req.body;

  console.log("Username:", username);
  console.log("Phone:", phone);
  console.log("Email:", email);
  console.log("Password:", password);

  const profileData = {
    username: username,
    phone: phone,
    email: email,
    password: password,
  };

  try {
    const accountExist =
      (await user_collection.findOne({ phone: phone })) ||
      (await user_collection.findOne({ email: email }));
    const usernameExist = await user_collection.findOne({ username: username });
    if (accountExist) {
      res.json("accountExist");
    } else if (usernameExist) {
      res.json("usernameExist");
    } else {
      res.json("newUser");
      await user_collection.insertMany([profileData]);
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

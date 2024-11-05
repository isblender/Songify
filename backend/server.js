const express = require("express");
// // const admin = require("firebase-admin");
const cors = require("cors");
const methods = require("./mongo");
const bodyParser = require("body-parser");

// // // Initialize Firebase
// // const serviceAccount = require("./serviceAccountKey.json");
// // admin.initializeApp({
// //   credential: admin.credential.cert(serviceAccount),
// //   databaseURL: "https://your-database-name.firebaseio.com",
// // });

const app = express();
app.use(cors());
app.use(bodyParser.json());

// // // Import routes
// const uploadRoutes = require("./routes/uploadRoutes");
// const historyRoutes = require("./routes/historyRoutes");
const loginRoutes = require("./routes/loginRoutes");
const signupRoutes = require("./routes/signupRoutes");

// // // Use routes
// app.use("/api/upload", uploadRoutes);
// app.use("/api/history", historyRoutes);
app.use("api/login", loginRoutes);
app.use("api/signup", signupRoutes);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

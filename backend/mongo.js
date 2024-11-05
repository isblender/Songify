const mongoose = require("mongoose");
mongoose
  .connect("mongodb://localhost:27017/dsu_songify")
  .then(() => {
    console.log("mongodb connected");
  })
  .catch((e) => {
    console.log(e);
    console.log("failed");
  });

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  history: {
    type: Array,
    required: true,
    default: [],
  }
});

const conversionSchema = new mongoose.Schema({
  photoId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "fs.files",
  }, // reference to GridFS
  songName: { type: String, required: true },
});

const conversion_collection = mongoose.model("conversion", conversionSchema);
const user_collection = mongoose.model("user", userSchema);

exports.conversion_collection = conversion_collection;
exports.user_collection = user_collection;

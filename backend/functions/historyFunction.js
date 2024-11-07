const User = require("../models/User");

async function getUserHistory(userId) {
    const user = await User.findById(userId).populate({
        path: "history",
        model: "Conversion",
    });
    return user.history;
}

module.exports = { getUserHistory };
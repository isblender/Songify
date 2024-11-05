// const admin = require("firebase-admin");
// const db = admin.firestore();

// exports.getUserHistory = async (req, res) => {
//   const userId = req.params.userId;

//   try {
//     const historySnapshot = await db
//       .collection("userHistory")
//       .doc(userId)
//       .collection("images")
//       .orderBy("timestamp", "desc")
//       .get();

//     const history = historySnapshot.docs.map((doc) => ({
//       id: doc.id,
//       ...doc.data(),
//     }));

//     res.status(200).json({ history });
//   } catch (error) {
//     console.error("Error fetching user history:", error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// };

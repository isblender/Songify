const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const routes = require("./routes");
const connectDB = require("./config/mongoose");
const http = require("http"); // Import http to create a server
const { Server } = require("socket.io"); // Import Socket.IO

const app = express();
app.use(
  cors({
    origin: "*", // Or specify "http://localhost:8081" for more security
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"], // Add any other headers your app might send
    credentials: true, // if you're handling cookies or sessions
  })
);
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

connectDB();

app.use("/", routes);

// Create an HTTP server and integrate Socket.IO
const server = http.createServer(app); // Create an HTTP server with Express
const io = new Server(server, {
  cors: {
    origin: "*", // Allow all origins (adjust as needed for security)
    methods: ["GET", "POST", "DELETE"],
  },
});

io.on("connection", (socket) => {
  console.log("A user connected");

  // Listen for a "join" event to add the socket to a user-specific room
  socket.on("joinRoom", (userId) => {
    socket.join(userId);
    console.log(`User with ID ${userId} joined room ${userId}`);
  });

  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
});

const getIoInstance = () => io;

module.exports = { server, getIoInstance };

server.listen(3000, () => {
  console.log("Server is running on port 3000");
});

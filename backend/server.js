const express = require("express");
const mongoose = require("mongoose");
const multer = require("multer");
const http = require("http");
const { Server } = require("socket.io");
const path = require("path");
const connectDB = require("./config/db");
const Feedback = require("./models/Feedback");
const cors = require("cors");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*", // Allow all origins
    methods: ["GET", "POST"],
  },
});
const PORT = 5000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors()); // Enable CORS for Express routes
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

const storage = multer.diskStorage({
  destination: "./uploads",
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage });

const feedbackQueue = [];

// API to receive feedback
app.post("/api/feedback", upload.single("image"), async (req, res) => {
  const { text } = req.body;
  const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;

  // Add feedback to queue
  const newFeedback = { text, imageUrl };
  feedbackQueue.push(newFeedback);

  // Broadcast feedback to display app
  io.emit("newFeedback", newFeedback);

  // Save to MongoDB
  const feedback = new Feedback(newFeedback);
  await feedback.save();

  res.json({ message: "Feedback submitted" });
});

// Real-time display
io.on("connection", (socket) => {
  console.log("New client connected");
});

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));

const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const connectDB = require("./db/db");

const authRoutes = require("./routes/auth.routes");
const subjectRoutes = require("./routes/subject.routes");
const topicRoutes = require("./routes/topic.routes");
const noteRoutes = require("./routes/note.routes");
const videoRoutes = require("./routes/video.routes"); // Add this line

connectDB();

app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  return res.status(200).json({
    success: true,
    message: "Engineering Notes App API",
    version: "1.0.0",
  });
});

// Importing routes
app.use("/api/auth", authRoutes);
app.use("/api/subjects", subjectRoutes);
app.use("/api/topics", topicRoutes);
app.use("/api/notes", noteRoutes);
app.use("/api/videos", videoRoutes); // Add this line

module.exports = app;

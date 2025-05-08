const mongoose = require("mongoose");

const videoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  branch: {
    type: String,
    required: true,
    enum: [
      "BCT",
      "BEI",
      "BEL",
      "BCE",
      "BAS",
      "BAM",
      "BIE",
      "BGE",
      "BME",
      "BCH",
      "Other",
    ],
    default: "BCT",
  },
  semester: {
    type: Number,
    required: true,
    min: 1,
    max: 8,
  },
  subjectCode: {
    type: String,
    required: true,
    trim: true,
  },
  subjectName: {
    type: String,
    required: true,
    trim: true,
  },
  youtubeId: {
    type: String,
    required: true,
  },
  topicId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Topic",
    required: true,
  },
  relatedNotes: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Note",
  },
  upvotes: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  downvotes: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  tags: [String],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

module.exports = mongoose.model("Video", videoSchema);

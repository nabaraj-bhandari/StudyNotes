const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema({
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
  pdfDriveId: {
    type: String,
    required: true,
    trim: true,
  },
  topicId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Topic",
    required: true,
  },
  relatedVideos: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Video",
  },
  tags: [String],
  upvotes: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  downvotes: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
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

module.exports = mongoose.model("Note", noteSchema);

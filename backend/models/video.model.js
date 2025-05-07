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
  videoLink: {
    type: String,
    required: true,
    trim: true,
  },
  relatedNotes: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Note",
  },
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

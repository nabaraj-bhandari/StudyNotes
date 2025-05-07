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
  pdfDriveLink: {
    type: String,
    required: true,
    trim: true,
  },
  relatedVideos: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Video",
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

module.exports = mongoose.model("Note", noteSchema);

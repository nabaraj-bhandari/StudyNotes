const mongoose = require("mongoose");

const subjectSchema = new mongoose.Schema({
  name: { type: String, required: true },
  subjectCode: { type: String, required: true },
  semester: { type: Number, required: true, min: 1, max: 8 },
});

module.exports = mongoose.model("Subject", subjectSchema);

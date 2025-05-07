const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  name: {
    firstName: {
      type: String,
      required: true,
      trim: true,
      minlength: [3, "First Name should be at least 3 characters long"],
    },
    lastName: {
      type: String,
      trim: true,
      minlength: [3, "Last Name should be at least 3 characters long"],
    },
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    lowercase: true,
  },
  passwordHash: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    emum: ["user", "admin"],
    default: "user",
  },
  bookmarks: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Notes",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

userSchema.methods.createAuthToken = function () {
  const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || "1d",
  });
  return token;
};

userSchema.methods.comparePassword = async function (password) {
  const isMatch = await bcrypt.compare(password, this.passwordHash);
  return isMatch;
};

userSchema.statics.hashPassword = async function (password) {
  const hash = await bcrypt.hash(password, 10);
  return hash;
};

module.exports = mongoose.model("User", userSchema);

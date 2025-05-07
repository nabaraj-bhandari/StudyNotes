const authService = require("../services/auth.service");
const { validationResult } = require("express-validator");
const userModel = require("../models/user.model");

module.exports.register = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(401).json({
      success: false,
      message: "Validation Error",
      errors: errors.array(),
    });
  }

  const { name, email, password } = req.body;
  hashedPassword = await userModel.hashPassword(password);

  const user = await authService.register({
    firstName: name.firstName,
    lastName: name.lastName,
    email,
    password: hashedPassword,
  });

  const token = user.createAuthToken();

  res.status(201).json({
    success: true,
    message: "User registered successfully",
    data: {
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      token,
    },
  });
};

module.exports.login = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(401).json({
      success: false,
      message: "Validation Error",
      errors: errors.array(),
    });
  }

  const { email, password } = req.body;

  // Check if user exists
  const user = await userModel.findOne({ email }).select("+passwordHash");
  if (!user) {
    return res.status(401).json({
      success: false,
      message: "Invalid Credentials",
    });
  }

  // Check if password is correct
  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    return res.status(401).json({
      success: false,
      message: "Invalid Credentials",
    });
  }

  const token = user.createAuthToken();
  res.cookie("token", token);

  res.status(200).json({
    success: true,
    message: "User logged in successfully",
    data: {
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      token,
    },
  });
};

module.exports.getUser = async (req, res) => {
  res.status(200).json({
    success: true,
    message: "User fetched successfully",
    data: {
      user: {
        _id: req.user._id,
        name: req.user.name,
        email: req.user.email,
        role: req.user.role,
      },
    },
  });
};

module.exports.logout = async (req, res) => {
  res.clearCookie("token");
  res.status(200).json({
    success: true,
    message: "User logged out successfully",
  });
};

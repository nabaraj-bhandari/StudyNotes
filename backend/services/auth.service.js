const userModel = require("../models/user.model");

module.exports.register = async ({ firstName, lastName, email, password }) => {
  if (!firstName || !email || !password) {
    throw new Error("All fields are required");
  }

  // Check if user already exists
  const existingUser = await userModel.findOne({ email });
  if (existingUser) {
    throw new Error("User with this email already exists");
  }

  const user = await userModel.create({
    name: {
      firstName,
      lastName,
    },
    email,
    passwordHash: password,
  });
  return user;
};

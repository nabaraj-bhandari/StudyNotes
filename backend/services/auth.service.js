const userModel = require("../models/user.model");

module.exports.register = async ({ firstName, lastName, email, password }) => {
  if (!firstName || !email || !password) {
    throw new Error("All fields are required");
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

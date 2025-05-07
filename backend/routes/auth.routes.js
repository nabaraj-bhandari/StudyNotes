const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const authContoller = require("../controllers/auth.controller");
const authMiddlware = require("../middlewares/auth.middleware");

router.post(
  "/register",
  [
    body("name.firstName")
      .notEmpty()
      .withMessage("First Name is required")
      .isLength({ min: 3 })
      .withMessage("First Name should be at least 3 characters long"),
    body("name.lastName")
      .optional()
      .isLength({ min: 3 })
      .withMessage("Last Name should be at least 3 characters long"),
    body("email")
      .notEmpty()
      .withMessage("Email is required")
      .isEmail()
      .withMessage("Invalid Email"),
    body("password")
      .notEmpty()
      .withMessage("Password is required")
      .isLength({ min: 6 })
      .withMessage("Password should be at least 6 characters long"),
  ],
  authContoller.register
);
router.post(
  "/login",
  [
    body("email")
      .notEmpty()
      .withMessage("Email is required")
      .isEmail()
      .withMessage("Invalid Email"),
    body("password")
      .notEmpty()
      .withMessage("Password is required")
      .isLength({ min: 6 })
      .withMessage("Password should be at least 6 characters long"),
  ],
  authContoller.login
);
router.get("/logout", authMiddlware.authUser, authContoller.logout);

router.get("/me", authMiddlware.authUser, authContoller.getUser);

module.exports = router;

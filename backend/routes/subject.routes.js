const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const authMiddleware = require("../middlewares/auth.middleware");
const subjectController = require("../controllers/subject.controller");

router.use(authMiddleware.authUser, authMiddleware.isAdmin);

router.post(
  "/",
  [
    body("name").notEmpty().withMessage("Subject name is required"),
    body("subjectCode").notEmpty().withMessage("Subject code is required"),
    body("semester")
      .isInt({ min: 1, max: 8 })
      .withMessage("Semester must be between 1 and 8"),
  ],
  subjectController.createSubject
);

router.put("/:subjectCode", subjectController.updateSubject);
router.delete("/:subjectCode", subjectController.deleteSubject);
router.get("/", subjectController.getAllSubjects);

module.exports = router;

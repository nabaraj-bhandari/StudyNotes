const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const authMiddleware = require("../middlewares/auth.middleware");
const noteController = require("../controllers/note.controller");

// Protect all routes - admin only
router.use(authMiddleware.authUser, authMiddleware.isAdmin);

// Create note
router.post(
  "/",
  [
    body("title").notEmpty().withMessage("Title is required"),
    body("branch").notEmpty().withMessage("Branch is required"),
    body("semester")
      .isInt({ min: 1, max: 8 })
      .withMessage("Semester must be between 1 and 8"),
    body("subjectCode").notEmpty().withMessage("Subject code is required"),
    body("subjectName").notEmpty().withMessage("Subject name is required"),
    body("pdfDriveId").notEmpty().withMessage("PDF Drive ID is required"),
    body("topicId").notEmpty().withMessage("Topic ID is required"),
  ],
  noteController.createNote
);

// Update note
router.put("/:id", noteController.updateNote);

// Delete note
router.delete("/:id", noteController.deleteNote);

// Get notes by topic
router.get("/:topicId", noteController.getNotesByTopic);

module.exports = router;

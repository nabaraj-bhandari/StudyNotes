const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const authMiddleware = require("../middlewares/auth.middleware");
const videoController = require("../controllers/video.controller");

// Protect all routes - admin only
router.use(authMiddleware.authUser, authMiddleware.isAdmin);

// Create video
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
    body("youtubeId").notEmpty().withMessage("YouTube ID is required"),
    body("topicId").optional(), // Optional topicId
  ],
  videoController.createVideo
);

// Update video
router.put("/:id", videoController.updateVideo);

// Delete video
router.delete("/:id", videoController.deleteVideo);

// Get videos by topic
router.get("/:topicId", videoController.getVideosByTopic);

module.exports = router;

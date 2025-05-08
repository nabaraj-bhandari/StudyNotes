const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const authMiddleware = require("../middlewares/auth.middleware");
const topicController = require("../controllers/topic.controller");

// Protect all routes - admin only
router.use(authMiddleware.authUser, authMiddleware.isAdmin);

// Create topic
router.post(
  "/",
  [
    body("name").notEmpty().withMessage("Topic name is required"),
    body("subjectCode").notEmpty().withMessage("Subject code is required"),
  ],
  topicController.createTopic
);

// Update topic
router.put("/:id", topicController.updateTopic);

// Delete topic
router.delete("/:id", topicController.deleteTopic);

// Get topics by subject code
router.get("/:subjectCode", topicController.getTopicsBySubject);

module.exports = router;

const { validationResult } = require("express-validator");
const Video = require("../models/video.model");
const Topic = require("../models/topic.model");

exports.createVideo = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array(),
      });
    }

    // Check if topic exists if topicId is provided
    if (req.body.topicId) {
      const topic = await Topic.findById(req.body.topicId);
      if (!topic) {
        return res.status(404).json({
          success: false,
          message: "Topic not found",
        });
      }
    }

    const video = await Video.create({
      ...req.body,
      createdBy: req.user._id,
    });

    res.status(201).json({
      success: true,
      data: video,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error creating video",
      error: error.message,
    });
  }
};

exports.updateVideo = async (req, res) => {
  try {
    const video = await Video.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!video) {
      return res.status(404).json({
        success: false,
        message: "Video not found",
      });
    }

    res.status(200).json({
      success: true,
      data: video,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error updating video",
      error: error.message,
    });
  }
};

exports.deleteVideo = async (req, res) => {
  try {
    const video = await Video.findByIdAndDelete(req.params.id);

    if (!video) {
      return res.status(404).json({
        success: false,
        message: "Video not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Video deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error deleting video",
      error: error.message,
    });
  }
};

exports.getVideosByTopic = async (req, res) => {
  try {
    const videos = await Video.find({ topicId: req.params.topicId })
      .populate("createdBy", "name email")
      .populate("topicId", "name")
      .populate("relatedNotes", "title");

    res.status(200).json({
      success: true,
      data: videos,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching videos",
      error: error.message,
    });
  }
};

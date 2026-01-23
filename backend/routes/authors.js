const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Post = require("../models/Post");

// @route   GET /api/authors
// @desc    Get all authors
// @access  Public
router.get("/", async (req, res) => {
  try {
    const authors = await User.find({
      role: { $in: ["author", "admin"] },
      isActive: true,
    }).select("-password");

    // Get post count for each author
    const authorsWithPosts = await Promise.all(
      authors.map(async (author) => {
        const postCount = await Post.countDocuments({
          authorId: author._id,
          status: "published",
        });

        return {
          ...author.toObject(),
          postCount,
        };
      }),
    );

    res.json({
      success: true,
      authors: authorsWithPosts,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch authors",
      error: error.message,
    });
  }
});

// @route   GET /api/authors/:id
// @desc    Get single author with their posts
// @access  Public
router.get("/:id", async (req, res) => {
  try {
    const author = await User.findById(req.params.id).select("-password");

    if (!author) {
      return res.status(404).json({
        success: false,
        message: "Author not found",
      });
    }

    // Get author's posts
    const posts = await Post.find({
      authorId: author._id,
      status: "published",
    }).sort({ createdAt: -1 });

    res.json({
      success: true,
      author: {
        ...author.toObject(),
        postCount: posts.length,
      },
      posts,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch author",
      error: error.message,
    });
  }
});

module.exports = router;

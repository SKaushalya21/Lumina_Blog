const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const Post = require("../models/Post");
const { protect, authorize } = require("../middleware/auth");

// @route   GET /api/posts
// @desc    Get all posts with filtering and pagination
// @access  Public
router.get("/", async (req, res) => {
  try {
    const {
      category,
      search,
      status = "published",
      page = 1,
      limit = 12,
    } = req.query;

    // Build query
    let query = { status };

    if (category && category !== "all") {
      query.category = category;
    }

    if (search) {
      query.$text = { $search: search };
    }

    // Execute query with pagination
    const posts = await Post.find(query)
      .populate("authorId", "name avatar role bio")
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .lean();

    // Get total count for pagination
    const count = await Post.countDocuments(query);

    res.json({
      success: true,
      posts,
      pagination: {
        total: count,
        page: parseInt(page),
        pages: Math.ceil(count / limit),
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch posts",
      error: error.message,
    });
  }
});

// @route   GET /api/posts/:id
// @desc    Get single post by ID
// @access  Public
router.get("/:id", async (req, res) => {
  try {
    // Validate ObjectId format
    const mongoose = require("mongoose");
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(404).json({
        success: false,
        message: "Invalid post ID format",
      });
    }

    const post = await Post.findById(req.params.id).populate(
      "authorId",
      "name avatar role bio",
    );

    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }

    // Increment views
    post.views += 1;
    await post.save();

    res.json({
      success: true,
      post,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch post",
      error: error.message,
    });
  }
});

// @route   POST /api/posts
// @desc    Create a new post
// @access  Private (Author/Admin)
router.post(
  "/",
  [
    protect,
    authorize("author", "admin"),
    body("title")
      .trim()
      .isLength({ min: 5 })
      .withMessage("Title must be at least 5 characters"),
    body("excerpt").trim().notEmpty().withMessage("Excerpt is required"),
    body("content")
      .trim()
      .isLength({ min: 10 })
      .withMessage("Content must be at least 10 characters"),
    body("category")
      .isIn(["tech", "design", "business", "lifestyle", "tutorial", "news"])
      .withMessage("Invalid category"),
  ],
  async (req, res) => {
    try {
      // Validate input
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          success: false,
          errors: errors.array(),
        });
      }

      // Calculate read time based on content length
      const wordCount = req.body.content.split(/\s+/).length;
      const readTime = `${Math.ceil(wordCount / 200)} min read`;

      const post = await Post.create({
        ...req.body,
        authorId: req.user.id,
        readTime,
      });

      const populatedPost = await Post.findById(post._id).populate(
        "authorId",
        "name avatar role bio",
      );

      res.status(201).json({
        success: true,
        message: "Post created successfully",
        post: populatedPost,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Failed to create post",
        error: error.message,
      });
    }
  },
);

// @route   PUT /api/posts/:id
// @desc    Update a post
// @access  Private (Author/Admin)
router.put(
  "/:id",
  [protect, authorize("author", "admin")],
  async (req, res) => {
    try {
      let post = await Post.findById(req.params.id);

      if (!post) {
        return res.status(404).json({
          success: false,
          message: "Post not found",
        });
      }

      // Check ownership (unless admin)
      if (
        post.authorId.toString() !== req.user.id &&
        req.user.role !== "admin"
      ) {
        return res.status(403).json({
          success: false,
          message: "Not authorized to update this post",
        });
      }

      // Recalculate read time if content changed
      if (req.body.content) {
        const wordCount = req.body.content.split(/\s+/).length;
        req.body.readTime = `${Math.ceil(wordCount / 200)} min read`;
      }

      post = await Post.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
      }).populate("authorId", "name avatar role bio");

      res.json({
        success: true,
        message: "Post updated successfully",
        post,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Failed to update post",
        error: error.message,
      });
    }
  },
);

// @route   DELETE /api/posts/:id
// @desc    Delete a post
// @access  Private (Author/Admin)
router.delete(
  "/:id",
  [protect, authorize("author", "admin")],
  async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);

      if (!post) {
        return res.status(404).json({
          success: false,
          message: "Post not found",
        });
      }

      // Check ownership (unless admin)
      if (
        post.authorId.toString() !== req.user.id &&
        req.user.role !== "admin"
      ) {
        return res.status(403).json({
          success: false,
          message: "Not authorized to delete this post",
        });
      }

      await post.deleteOne();

      res.json({
        success: true,
        message: "Post deleted successfully",
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Failed to delete post",
        error: error.message,
      });
    }
  },
);

// @route   POST /api/posts/:id/like
// @desc    Like/Unlike a post
// @access  Private
router.post("/:id/like", protect, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }

    const userId = req.user.id;
    const alreadyLiked = post.likedBy.includes(userId);

    if (alreadyLiked) {
      // Unlike
      post.likedBy = post.likedBy.filter((id) => id.toString() !== userId);
      post.likes = Math.max(0, post.likes - 1);
    } else {
      // Like
      post.likedBy.push(userId);
      post.likes += 1;
    }

    await post.save();

    res.json({
      success: true,
      message: alreadyLiked ? "Post unliked" : "Post liked",
      liked: !alreadyLiked,
      likes: post.likes,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to like post",
      error: error.message,
    });
  }
});

module.exports = router;

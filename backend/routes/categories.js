const express = require("express");
const router = express.Router();
const Category = require("../models/Category");
const Post = require("../models/Post");

// @route   GET /api/categories
// @desc    Get all categories with post counts
// @access  Public
router.get("/", async (req, res) => {
  try {
    // Default categories
    const defaultCategories = [
      {
        id: "tech",
        name: "Technology",
        color:
          "bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-200 ring-1 ring-blue-500/20",
      },
      {
        id: "design",
        name: "Design",
        color:
          "bg-purple-100 text-purple-800 dark:bg-purple-900/40 dark:text-purple-200 ring-1 ring-purple-500/20",
      },
      {
        id: "business",
        name: "Business",
        color:
          "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-200 ring-1 ring-emerald-500/20",
      },
      {
        id: "lifestyle",
        name: "Lifestyle",
        color:
          "bg-orange-100 text-orange-800 dark:bg-orange-900/40 dark:text-orange-200 ring-1 ring-orange-500/20",
      },
      {
        id: "tutorial",
        name: "Tutorial",
        color:
          "bg-pink-100 text-pink-800 dark:bg-pink-900/40 dark:text-pink-200 ring-1 ring-pink-500/20",
      },
      {
        id: "news",
        name: "News",
        color:
          "bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-200 ring-1 ring-slate-500/20",
      },
    ];

    // Get post count for each category
    const categoriesWithCount = await Promise.all(
      defaultCategories.map(async (cat) => {
        const count = await Post.countDocuments({
          category: cat.id,
          status: "published",
        });

        return {
          ...cat,
          postCount: count,
        };
      }),
    );

    res.json({
      success: true,
      categories: categoriesWithCount,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch categories",
      error: error.message,
    });
  }
});

// @route   GET /api/categories/:id/posts
// @desc    Get all posts in a category
// @access  Public
router.get("/:id/posts", async (req, res) => {
  try {
    const posts = await Post.find({
      category: req.params.id,
      status: "published",
    })
      .populate("authorId", "name avatar role")
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      category: req.params.id,
      posts,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch posts",
      error: error.message,
    });
  }
});

module.exports = router;

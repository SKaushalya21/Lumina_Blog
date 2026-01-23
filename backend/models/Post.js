const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
      minlength: [5, "Title must be at least 5 characters"],
      maxlength: [200, "Title cannot exceed 200 characters"],
    },
    excerpt: {
      type: String,
      required: [true, "Excerpt is required"],
      maxlength: [500, "Excerpt cannot exceed 500 characters"],
    },
    content: {
      type: String,
      required: [true, "Content is required"],
      minlength: [10, "Content must be at least 10 characters"],
    },
    image: {
      type: String,
      default: "https://picsum.photos/800/400",
    },
    category: {
      type: String,
      required: [true, "Category is required"],
      enum: ["tech", "design", "business", "lifestyle", "tutorial", "news"],
    },
    authorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    readTime: {
      type: String,
      default: "5 min read",
    },
    likes: {
      type: Number,
      default: 0,
    },
    views: {
      type: Number,
      default: 0,
    },
    status: {
      type: String,
      enum: ["draft", "published", "archived"],
      default: "published",
    },
    tags: [
      {
        type: String,
        trim: true,
      },
    ],
    likedBy: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    timestamps: true,
  },
);

// Index for better query performance
postSchema.index({ title: "text", content: "text" });
postSchema.index({ category: 1, status: 1 });
postSchema.index({ authorId: 1 });

// Virtual for formatted date
postSchema.virtual("formattedDate").get(function () {
  return this.createdAt.toLocaleDateString();
});

module.exports = mongoose.model("Post", postSchema);

const mongoose = require("mongoose");
const dotenv = require("dotenv");
const User = require("../models/User");
const Post = require("../models/Post");

dotenv.config();

const seedData = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("✅ MongoDB Connected");

    // Clear existing data
    await User.deleteMany({});
    await Post.deleteMany({});
    console.log("🗑️  Cleared existing data");

    // Create users
    const users = await User.create([
      {
        name: "Alex Rivera",
        email: "alex@lumina.com",
        password: "password123",
        role: "admin",
        avatar: "https://i.pravatar.cc/150?u=1",
        bio: "Tech enthusiast and coffee addict. Writing about the future of web development.",
      },
      {
        name: "Sarah Chen",
        email: "sarah@lumina.com",
        password: "password123",
        role: "author",
        avatar: "https://i.pravatar.cc/150?u=2",
        bio: "Believer in clean code and cleaner interfaces. Specializing in accessibility.",
      },
      {
        name: "Marcus Johnson",
        email: "marcus@lumina.com",
        password: "password123",
        role: "author",
        avatar: "https://i.pravatar.cc/150?u=3",
        bio: "Helping startups scale. Writing about product strategy and growth.",
      },
    ]);
    console.log("👥 Created users");

    // Create posts
    const postTitles = [
      "The Future of React Server Components",
      "Mastering Tailwind CSS Grids",
      "Why UX Writing Matters",
      "Scaling Node.js Microservices",
      "The minimalist guide to Productivity",
      "Web3: Beyond the Hype",
      "Understanding Color Theory in UI",
      "A Guide to Modern SEO",
      "Building Accessible Forms",
      "State Management in 2024",
      "Deploying with Docker",
      "The Art of Code Review",
    ];

    const categories = [
      "tech",
      "design",
      "business",
      "lifestyle",
      "tutorial",
      "news",
    ];

    const posts = [];
    for (let i = 0; i < postTitles.length; i++) {
      posts.push({
        title: postTitles[i],
        excerpt:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.",
        content: `This is a comprehensive guide exploring ${postTitles[i]}.\n\n## Introduction\nLorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.\n\n## Key Concepts\n- Understanding the fundamentals\n- Best practices and patterns\n- Real-world applications\n\nConsectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.\n\n## Advanced Techniques\n\nDuis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\n\n## Conclusion\n\nSed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.`,
        image: `https://picsum.photos/seed/${i + 10}/800/400`,
        category: categories[i % categories.length],
        authorId: users[i % users.length]._id,
        readTime: `${3 + (i % 5)} min read`,
        likes: 120 + i * 15,
        views: 1000 + i * 200,
        status: "published",
        tags: ["development", "tutorial", "guide"],
      });
    }

    await Post.create(posts);
    console.log("📝 Created posts");

    console.log("\n✨ Database seeded successfully!");
    console.log("\n🔐 Login credentials:");
    console.log("Admin: alex@lumina.com / password123");
    console.log("Author: sarah@lumina.com / password123");
    console.log("Author: marcus@lumina.com / password123");

    process.exit(0);
  } catch (error) {
    console.error("❌ Error seeding database:", error);
    process.exit(1);
  }
};

seedData();

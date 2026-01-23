# Lumina Blog Backend API

Complete Node.js + Express + MongoDB backend for the Lumina Blog Platform.

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB Atlas account (connection string provided)

### Installation

1. Navigate to the backend directory:

```bash
cd backend
```

2. Install dependencies:

```bash
npm install
```

3. Environment variables are already configured in `.env` file

4. Seed the database with sample data:

```bash
node scripts/seed.js
```

5. Start the server:

```bash
npm start
```

Or for development with auto-reload:

```bash
npm run dev
```

The API will be running at `http://localhost:5000`

## 📚 API Endpoints

### Authentication

- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (Protected)

### Posts

- `GET /api/posts` - Get all posts (with filtering & pagination)
- `GET /api/posts/:id` - Get single post
- `POST /api/posts` - Create new post (Protected - Author/Admin)
- `PUT /api/posts/:id` - Update post (Protected - Author/Admin)
- `DELETE /api/posts/:id` - Delete post (Protected - Author/Admin)
- `POST /api/posts/:id/like` - Like/Unlike post (Protected)

### Authors

- `GET /api/authors` - Get all authors
- `GET /api/authors/:id` - Get author with their posts

### Categories

- `GET /api/categories` - Get all categories with post counts
- `GET /api/categories/:id/posts` - Get posts by category

## 🔐 Authentication

The API uses JWT (JSON Web Tokens) for authentication.

### Login Example:

```javascript
POST /api/auth/login
{
  "email": "alex@lumina.com",
  "password": "password123"
}

Response:
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": { ... }
}
```

### Using Protected Routes:

Include the token in the Authorization header:

```
Authorization: Bearer YOUR_JWT_TOKEN
```

## 👤 Test Accounts

After running the seed script:

- **Admin:** alex@lumina.com / password123
- **Author:** sarah@lumina.com / password123
- **Author:** marcus@lumina.com / password123

## 🗄️ Database Schema

### User Model

- name, email, password (hashed)
- avatar, role (user/author/admin)
- bio, isActive
- timestamps

### Post Model

- title, excerpt, content
- image, category, authorId
- readTime, likes, views
- status (draft/published/archived)
- tags, likedBy
- timestamps

## 🛠️ Tech Stack

- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB (Mongoose ODM)
- **Authentication:** JWT + bcryptjs
- **Validation:** express-validator
- **CORS:** Enabled for frontend integration

## 📝 Notes

- All passwords are hashed using bcryptjs
- JWT tokens expire in 30 days
- Posts support text search and filtering
- Automatic read time calculation based on word count
- Views are tracked automatically
- Authors can only edit/delete their own posts (except admins)

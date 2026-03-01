# Lumina Blog Platform
## Group Information
- **Student 1:** [KAL Polgampola] - [ITBIN-2313-0083] - Role: [FrontEnd]
- **Student 2:** [AMSK Adhikari] - [ITBIN-2313-0005] - Role: [BackEnd]
## Project Description
Lumina Blog is a web-based blogging platform where users can read blogs and also create and share their own blog posts. The application provides a simple and user-friendly interface for managing and browsing blog content.
## Live Deployment
🔗 **Live URL:** [https://dev-ten-livid.vercel.app/]
## Technologies Used
- HTML5, CSS3, JavaScript, JSON
- Tailwind CSS
- GitHub Actions
- Vercel (Deployment Platform)
## Features
- View and read blog posts
- Create and publish new blog posts
- Search blogs
- Responsive and clean UI  

## Branch Strategy
We implemented the following branching strategy:
- `main` - Production branch
- `develop` - Integration branch
- `feature/liyathabara` - Feature development branches
- `feature/shalini` - Feature development branches
## Individual Contributions
### [KAL Polgampola]
- Repository setup and configuration
- GitHub Actions CI/CD pipeline implementation
- Vercel deployment configuration
- Branch management and version control
### [AMSK Adhikari]
- Web page design and implementation
- JavaScript functionality for the blog system
- Blog creation and display features

## Setup Instructions
### Prerequisites
- Javascript
- Git
### Installation
```bash
# Clone the repository
git clone https://github.com/SKaushalya21/Lumina_Blog.git
# Navigate to project directory
cd Lumina_Blog
# Install dependencies
npm install
# Run development server
npm run dev
# Deployment Process
This project follows a continuous integration and deployment workflow using GitHub and Vercel. The source code is stored in a GitHub repository, and whenever new changes are pushed, Vercel is automatically notified. It then runs the build process and, if everything is successful, publishes the latest version of the application to the live website. As a result, every update made to the main branch is deployed automatically without needing to deploy it manually.
# Challenges Faced
[Optional: Describe any challenges and how you resolved them]
# Build Status
---The project is successfully deployed and live on Vercel.
## 📝 Step-by-Step Implementation Guide
### Phase 1: Setup (0-15 minutes)
#### Step 1: Team Formation & Planning
1. Form your team (2 students)
2. Assign roles based on strengths
3. Choose your project type
4. Decide on features to implement
#### Step 2: Repository Creation (DevOps Engineer)
1. Go to GitHub.com and sign in
2. Click "New Repository"
3. Name: `Lumina_Blog`
4. Description: "Advanced Git & DevOps Team Collaboration Assignment"
5. Select **PUBLIC**
6. Initialize with README: **NO** (we'll create our own)
7. Click "Create Repository"
#### Step 3: Add Collaborators
1. Go to Settings → Collaborators
2. Add all team members by GitHub username
3. Each member should accept the invitation
#### Step 4: Clone Repository (All Members)
```bash
git clone https://github.com/SKaushalya21/Lumina_Blog.git
cd Lumina_Blog
Step 5: Initial Setup (DevOps Engineer)
# Create initial files
touch README.md .gitignore
# Create branch structure
git checkout -b develop
git push -u origin develop
# Create GitHub Actions directory
mkdir -p .github/workflows
# Add initial commit
git add .
git commit -m "chore: initial repository setup"
git push origin develop

# Dockerised Application Instructions (Assignment 2 Update)

## Overview

The Lumina Blog platform is deployed using a multi-container Docker architecture consisting of:

- MongoDB (Database)
- Backend API Service
- Frontend Web Server

All services are orchestrated using Docker Compose.

---

## Prerequisites

Ensure the following are installed:

- Docker Engine (v20.10 or higher recommended)
- Docker Compose (v2+)
- Git

Verify installation:

    docker --version
    docker compose version

---

## Cloning the Repository

    git clone https://github.com/SKaushalya21/Lumina_Blog.git
    cd Lumina_Blog

---

## Running the Application (Recommended Method)

### Build and Start All Services

From the project root directory (where docker-compose.yml is located):

    docker compose up --build

This command will:

- Build the backend image
- Build the frontend image
- Pull the MongoDB image
- Create containers
- Configure internal networking
- Start all services

---

## Accessing the Application

Frontend Application:
    http://localhost:8080/

Backend API:
    http://localhost:5000/

MongoDB:
    mongodb://localhost:27017

---

## Port Configuration

| Service   | Container Port | Host Port |
|-----------|---------------|-----------|
| Frontend  | 80            | 8080      |
| Backend   | 5000          | 5000      |
| MongoDB   | 27017         | 27017     |

Note: The frontend container runs internally on port 80, which is mapped to 8080 on the host machine.

---

## Stopping the Application

    docker compose down

To stop and remove volumes (including MongoDB data):

    docker compose down -v

---

## Rebuilding After Code Changes

    docker compose up --build

---

## Environment Variables

The backend service uses the following environment variables defined in docker-compose.yml:

- PORT=5000
- MONGODB_URI=mongodb://mongo:27017/lumina_blog

These variables configure backend service connectivity to the MongoDB container via Docker’s internal service networking.

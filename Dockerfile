########################################
# 1️⃣ Build Stage – compile Tailwind CSS
########################################

# Use official Node.js for building
FROM node:18-alpine AS builder

# Set working directory
WORKDIR /app

# Copy npm manifest first (better layer caching)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy entire source
COPY . .

# Build your frontend
# Adjust this if your build folder is different
RUN npm run build

########################################
# 2️⃣ Production Stage – serve static files
########################################

FROM nginx:alpine

# Remove default static files
RUN rm -rf /usr/share/nginx/html/*

# Copy built files from builder
# Adjust path if your build output is in a different folder like dist/, build/, public/
COPY --from=builder /app/build /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Healthcheck to verify the container is working
HEALTHCHECK --interval=30s --timeout=5s --start-period=5s \
  CMD wget --quiet --tries=1 --spider http://localhost || exit 1

# Start nginx
CMD ["nginx", "-g", "daemon off;"]

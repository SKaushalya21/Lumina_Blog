FROM node:18-alpine

WORKDIR /app

# Copy package files first (layer caching)
COPY package*.json ./

RUN npm install --production

# Copy rest of backend code
COPY . .

# Create non-root user
RUN addgroup -S appgroup && adduser -S appuser -G appgroup
USER appuser

EXPOSE 5000

HEALTHCHECK --interval=30s --timeout=5s --start-period=10s \
  CMD wget --quiet --tries=1 --spider http://localhost:5000/api/health || exit 1

CMD ["npm", "start"]

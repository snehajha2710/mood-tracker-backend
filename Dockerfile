# Use Node.js LTS
FROM node:20-alpine

# Create app directory
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy source code
COPY . .

# Build TypeScript
RUN npm run build

# Expose app port
EXPOSE 3000

# Start server
CMD ["node", "dist/server.js"]

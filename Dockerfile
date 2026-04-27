# Base image
FROM node:18-alpine
 
# Create app directory
WORKDIR /app
 
# Copy package files
COPY package*.json ./
 
# Install dependencies (from your package.json)
RUN npm ci --only=production
 
# Copy all code
COPY . .
 
# Expose port (checking your package.json - need to find port)
EXPOSE 3001
 
# Start the app
CMD ["node", "server.js"]
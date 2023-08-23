# Use an official Node.js runtime as the base image
FROM node:14 AS build

# Set the working directory to the application root
WORKDIR /app

# Copy package.json and package-lock.json to the client folder
COPY client/package*.json ./client/
COPY server/package*.json ./server/

# Install React app dependencies
RUN cd ./client && npm install

# Copy the rest of the client application code
COPY client/ ./client/
COPY server/ ./server/

# Build the React app
RUN cd ./client && npm run build

# Install root directory dependencies
RUN npm install

# Set the working directory to the server folder
WORKDIR /app/server

# Install server-specific dependencies
RUN npm install

# Expose the necessary ports
EXPOSE 80

# Set the startup command to "npm start"
CMD ["npm", "start"]
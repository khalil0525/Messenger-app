# Use an official Node.js runtime as the base image
FROM node:14 AS build

# Set the working directory to the client folder
WORKDIR /app/client

# Copy package.json and package-lock.json to the container
COPY client/package*.json ./

# Install React app dependencies
RUN npm install

# Copy the rest of the client application code
COPY client/ .

# Build the React app
RUN npm run build

# Switch to the root directory
WORKDIR /app

# Install root directory dependencies
COPY package*.json ./
RUN npm install

# Expose the necessary ports
EXPOSE 80

# Set the startup command to "start"
CMD ["npm", "start"]

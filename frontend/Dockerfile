# Use a Node.js base image
FROM node:alpine

# Set the working directory in the container
WORKDIR /app

# Copy package.json and install dependencies
COPY package.json .
RUN npm install

# Copy the rest of the application
COPY . .

# Build the React app
#RUN npm ci
RUN npm prune --production
#RUN npm run build

# Expose the port the React app runs on
EXPOSE 3000

# Command to run the React app
CMD ["npm", "start"]

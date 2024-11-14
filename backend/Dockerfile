# Use an official Node.js runtime as a parent image
FROM node:18

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies including TypeScript
RUN npm install && npm install -g typescript tsconfig-paths

# Copy the rest of the application code
COPY . .

# Build the TypeScript code
RUN npm run build

# Expose the port the backend will run on
EXPOSE 5000

# Start the application with tsconfig-paths for resolving path aliases
CMD ["npm", "start"]

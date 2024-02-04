# Base image
FROM node:20-alpine

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Copy .env file
COPY /.env ./


# Build TypeScript code
RUN npm run build

# Expose the port
EXPOSE 4000

# Command to run the application
CMD ["npm", "start"]

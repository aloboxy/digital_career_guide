# Use an official Node.js runtime as a parent image
FROM node:18-alpine

# Set the working directory in the container
WORKDIR /app

# Copy the package.json and yarn.lock files
COPY package.json yarn.lock ./

# Install dependencies using Yarn
RUN yarn install

# Copy the rest of the application code
COPY . .

# Generate Prisma client
RUN yarn prisma generate

# Build the Next.js application
RUN yarn build

# Expose the port that the application will run on
EXPOSE 3000

# Define the command to run your application
CMD ["yarn", "start"]

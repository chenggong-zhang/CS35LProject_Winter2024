#!/bin/bash

# Prompt user to enter environment variable values
echo "Enter your SENDGRID_API_KEY:"
read SENDGRID_API_KEY

echo "Enter your MONGODB_URI:"
read MONGODB_URI

echo "Enter your ACCESS_TOKEN_SECRET:"
read ACCESS_TOKEN_SECRET

echo "Enter your REFRESH_TOKEN_SECRET:"
read REFRESH_TOKEN_SECRET

echo "Enter your YOUTUBE_API_KEY:"
read YOUTUBE_API_KEY

# Export the variables
export SENDGRID_API_KEY
export MONGODB_URI
export ACCESS_TOKEN_SECRET
export REFRESH_TOKEN_SECRET
export YOUTUBE_API_KEY

echo "Installing dependencies for server..."
cd server
npm install

echo "Installing dependencies for client..."
cd ../client
npm install

cd ..
echo "Installing concurrently in root directory..."
npm install

echo "Initialization complete."
echo "running server and client..."
npm start

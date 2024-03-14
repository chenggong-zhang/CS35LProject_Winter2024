
echo "Installing dependencies for server..."
cd server
npm install

echo "Installing dependencies for client..."
cd ../client
npm install

cd ..
echo "Initialization complete."
echo "running server and client..."
npm start


echo "Installing dependencies for server..."
cd server
npm install

echo "Running server..."
npx nodemon app.js

echo "Installing dependencies for client..."
cd ../client
npm install

echo "Running client..."
npm start

echo "Initialization complete."
echo "Open the client in your browser at http://localhost:3000"
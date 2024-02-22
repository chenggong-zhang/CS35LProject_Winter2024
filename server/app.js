require('dotenv').config();
// require the express module
const express = require('express');

// create an instance of the express app
const app = express();

const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('Hello World!');
});

// start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
});

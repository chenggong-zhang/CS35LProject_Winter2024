require('dotenv').config();
// require the express module
const express = require('express');
// const cors = require('cors');

// // create an instance of the express app
// const app = express();
// app.use(cors({
//   origin: 'http://localhost:3000', // Specify the origin of requests that are allowed
//   methods: ['POST', 'PUT', 'PATCH', 'GET', 'DELETE', 'OPTIONS'], // Specify the methods allowed
// }));





const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
  res.send('Hello World!');
});

// start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
});

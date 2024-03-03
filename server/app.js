require('dotenv').config();
// require the express module
const express = require('express');

// create an instance of the express app
const app = express();

const PORT = process.env.PORT || 5000;

const routes = require('./routes');

app.get('/', (req, res) => {
  res.send('Hello World!');
});

// connect api routes
app.use('/auth', routes.auth);
app.use('/user', routes.user);
app.use('/relation', routes.relation);
app.use('/post', routes.post);

// start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
});

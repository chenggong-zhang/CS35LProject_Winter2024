require('dotenv').config();
// require the express module
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

// connect to the database
mongoose.connect(process.env.MONGODB_URI).then(() => {
  console.log('Connected to database');
}).catch(err => {
  console.error('Could not connect to database', err);
//   process.exit();
});

// create an instance of the express app
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors())

const PORT = process.env.PORT || 5000;

const routes = require('./routes');

// app.get('/', (req, res) => {
//   res.send('Hello World!');
// });

// connect api routes
app.use('/auth', routes.auth);
app.use('/user', routes.user);
app.use('/relation', routes.relation);
app.use('/post', routes.post);

// handle errors
app.use((err, req, res, next) => {
    console.error('Error:', err.message);
    res.status(500).json({ 
        ok: false,
        error: err.message || 'Something went wrong' 
    });
});

// start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
});

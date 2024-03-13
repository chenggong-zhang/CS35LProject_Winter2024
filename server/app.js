require('dotenv').config();
// require the express module
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const schedule = require('node-schedule');
const mongoSanitize = require('express-mongo-sanitize')


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
app.use(mongoSanitize()) // remove $ and . in object keys in req.body, req.params, req.headers, req.query

const PORT = process.env.PORT || 5000;

const routes = require('./routes');
const { emailService, userService} = require('./services');

// app.get('/', (req, res) => {
//   res.send('Hello World!');
// });

// connect api routes
app.use('/auth', routes.auth);
app.use('/user', routes.user);
app.use('/relation', routes.relation);
app.use('/post', routes.post);
app.use('*', (req, res) => {
  res.status(404).json({
    ok: false,
    error: 'Resource not found'
  });
});

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
  // start a scheduled job to send emails every day at 12:00 PM
  const emailJob = schedule.scheduleJob('0 12 * * *', async function(){
      const users = await userService.getAllUsers();

      if(users.length === 0) {
          console.log('No users found');
          return;
      }

    //   console.log(`Sending emails to users: ${users.map(user => user.email)}`);

    //   await emailService.sendVibeNotificationEmail({receivers: users.map(user => user.email)});
  });

});

const express = require('express');
const { authService, emailService,userService } = require('../services/index')

const router = express.Router();

// email login/signup with OTP email
router.post('/email', async (req, res) => {

  const { email } = req.body;

  // check input data
  if (!email) { 
    return res.status(400).json({
      ok: false,
      error: 'email is missing'
    });
  }

  // get or create user in database using email
  const user = await userService.upsertUser({ email });

  // send verification email to user
  const emailSuccess = await emailService.sendOTPEmail(user);

  if (!emailSuccess) {
    // return error response
    res.status(500).json({
      ok: false,
      error: 'failed to send OTP email'
    });
  } else {
    // return success response
    res.status(200).json({
      ok: true,
    });
  }
  
});

// email verification with OTP
router.post('/email/verify', async (req, res) => {
  const { email, otp } = req.body;

  // check input data
  if (!email) { 
    return res.status(400).json({
      ok: false,
      error: 'email is missing'
    });
  }
  if (!otp) { 
    return res.status(400).json({
      ok: false,
      error: 'OTP is missing'
    });
  }

  // verify OTP and login user
  const verifyResult = await authService.emailOTPVerify({ email, otp });

  if (!verifyResult.ok) {
    // return error response
    res.status(401).json({
      ok: false,
      error: verifyResult.error
    });
  } else {
    // return success response
    res.status(200).json({
      ok: true,
      user: verifyResult.user,
      accessToken: verifyResult.accessToken,
      refreshToken: verifyResult.refreshToken
    });
  }
});


// refresh access token
router.get('/token', async (req, res) => {

  const { refreshToken } = req.query;

  // check input data
  if (!refreshToken) { 
    return res.status(400).json({
      ok: false,
      error:'refreshToken is missing'
    });
  }

  // refresh access token
  const refreshResult = await authService.refreshAccessToken({ refreshToken });

  if (!refreshResult.ok) {
    // return error response
    res.status(401).json({
      ok: false,
      error: refreshResult.error
    });
  } else {
    // return success response
    res.status(200).json({
      ok: true,
      accessToken: refreshResult.accessToken
    });
  }
});


// logout
router.post('/logout', async (req, res) => {

  const user_id = req.user.id;

  // log user out
  const logoutResult = await authService.logout({ user_id });

  if (!logoutResult.ok) {
    // return error response
    res.status(404).json({
      ok: false,
      error: logoutResult.error
    });
  } else {
    // return success response
    res.status(200).json({
      ok: true,
    });
  }
});


module.exports = router;
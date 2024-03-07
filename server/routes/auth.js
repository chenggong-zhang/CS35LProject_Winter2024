const express = require('express');
const { authService, emailService,userService } = require('../services/index')

const router = express.Router();

// email login/signup with OTP email
router.post('/email', async (req, res, next) => {
  try {
    const { email } = req.body;

    // check input data
    if (!email) { 
      return res.status(400).json({
        ok: false,
        error: 'email is missing'
      });
    }

    // check if email is valid
    if (!emailService.validateEmail(email)) return res.status(400).json({ ok: false, error: 'invalid email' });

    // get or create user in database using email
    let user = await userService.upsertUser({ email });

    user = await authService.emailOTPAuth({ user });

    // send verification email to user
    const emailSuccess = await emailService.sendOTPEmail({ receiver: email, otp: user.temp_code.otp });

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
  } catch (error) {
    next(error);
  }
  
});

// email verification with OTP
router.post('/email/verify', async (req, res, next) => {

  try {
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

    // check if email is valid
    if (!emailService.validateEmail(email)) return res.status(400).json({ ok: false, error: 'invalid email' });

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
    
  } catch (error) {
    next(error);
  }
});


// refresh access token
router.get('/token', async (req, res, next) => {
  try {
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
    
  } catch (error) {
    next(error);
  }
});


// logout
router.post('/logout', authService.passportJWT, async (req, res, next) => {
  try {
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
    
  } catch (error) {
    next(error);
  }
});


module.exports = router;
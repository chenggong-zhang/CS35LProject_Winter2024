// module.exports = {
//     User: require('./user'),
//     Relation: require('./relation'),
//     Post: require('./post'),
// };

const express = require('express');
const jwt = require('jsonwebtoken');

const app = express();
app.use(express.json());

// Helper functions
const { checkIfUserExists, createUser, verifyOtp, generateAccessToken, generateRefreshToken, refreshTokenExists, removeRefreshToken } = require('./authHelpers');

// POST /auth/email - log in or sign up with an email
app.post('/auth/email', async (req, res) => {
  const { email } = req.body;

  try {
    let user = await checkIfUserExists(email);
    if (!user) {
      user = await createUser(email);
    }
    // You would normally send an email with OTP here for verification.

    res.status(200).json({ ok: true });
  } catch (error) {
    res.status(500).json({ ok: false, error: 'Internal Server Error' });
  }
});

// POST /auth/email/verify - use one-time password to verify email
app.post('/auth/email/verify', async (req, res) => {
  const { email, otp } = req.body;

  try {
    const userVerified = await verifyOtp(email, otp);
    if (userVerified) {
      const accessToken = generateAccessToken(user);
      const refreshToken = generateRefreshToken(user);

      res.status(200).json({ ok: true, accessToken, refreshToken });
    } else {
      res.status(400).json({ ok: false, error: 'Invalid OTP' });
    }
  } catch (error) {
    res.status(500).json({ ok: false, error: 'Internal Server Error' });
  }
});

// GET /auth/token - refresh access token
app.get('/auth/token', async (req, res) => {
  const { refreshToken } = req.query;

  try {
    if (await refreshTokenExists(refreshToken)) {
      const user = jwt.decode(refreshToken);
      const accessToken = generateAccessToken(user);

      res.status(200).json({ ok: true, accessToken });
    } else {
      res.status(400).json({ ok: false, error: 'Invalid refresh token' });
    }
  } catch (error) {
    res.status(500).json({ ok: false, error: 'Internal Server Error' });
  }
});

// POST /logout - log out
app.post('/logout', async (req, res) => {
  const authToken = req.header('Authorization').replace('Bearer ', '');

  try {
    // Here you should invalidate the current refresh token.
    await removeRefreshToken(authToken);
    res.status(200).json({ ok: true });
  } catch (error) {
    res.status(500).json({ ok: false, error: 'Internal Server Error' });
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

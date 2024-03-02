const express = require('express');

const router = express.Router();


router.post('/email', (req, res) => {

  // TODO: Implement email login/signup logic here
  res.status(200).json({
    ok: true,
    message: `endpoint: ${req.baseUrl}/${req.route.path}`
  });
  
});

router.post('/email/verify', (req, res) => {

  // TODO: Implement email verification logic here
  res.status(200).json({
    ok: true,
    message: `endpoint: ${req.baseUrl}/${req.route.path}`
  });

});

module.exports = router;
const express = require('express');

const router = express.Router();


router.get('/:user_id', (req, res) => {

  // TODO: retrieve user profile data
  res.status(200).json({
    ok: true,
    message: `endpoint: ${req.baseUrl}/${req.route.path}`
  });
  
});

router.post('/', (req, res) => {

    // TODO: update user profile data
    res.status(200).json({
      ok: true,
      message: `endpoint: ${req.baseUrl}/${req.route.path}`
    });
    
  });

  router.get('/', (req, res) => {
    // TODO: search users
    res.status(200).json({
      ok: true,
      message: `endpoint: ${req.baseUrl}/${req.route.path}`
    });
    
  });

  module.exports = router;
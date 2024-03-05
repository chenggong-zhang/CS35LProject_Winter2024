const express = require('express');

const router = express.Router();

router.get('/:user_id', (req, res) => {

  // TODO: Disconnect another user
  res.status(200).json({
    ok: true,
    message: `endpoint: ${req.baseUrl}/${req.route.path}`
  });
    
});


router.post('/connect/:user_id', (req, res) => {

  // TODO: connect with another user
  res.status(200).json({
    ok: true,
    message: `endpoint: ${req.baseUrl}/${req.route.path}`
  });
  
});

router.post('/disconnect/:user_id', (req, res) => {

  // TODO: Disconnect another user
  res.status(200).json({
    ok: true,
    message: `endpoint: ${req.baseUrl}/${req.route.path}`
  });
    
});


module.exports = router;
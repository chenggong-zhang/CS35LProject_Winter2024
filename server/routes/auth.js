const express = require('express');

const router = express.Router();


router.post('/email', (req, res) => {

  // TODO: Implement email verification logic here
  res.status(200).json({
    ok: true,
  });
  
});

module.exports = router;
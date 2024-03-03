const express = require('express');

const router = express.Router();


router.post('/', (req, res) => {

  // TODO: Create a post
  res.status(200).json({
    ok: true,
    message: `endpoint: ${req.baseUrl}/${req.route.path}`
  });
  
});



router.get('/', (req, res) => {

    // TODO: get a post
    res.status(200).json({
      ok: true,
      message: `endpoint: ${req.baseUrl}/${req.route.path}`
    });
    
  });


module.exports = router;
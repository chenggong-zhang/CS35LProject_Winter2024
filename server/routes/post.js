const express = require('express');

const router = express.Router();

// create a post
router.post('/', (req, res) => {

  res.status(200).json({
    ok: true,
    message: `endpoint: ${req.baseUrl}/${req.route.path}`
  });
  
});


// get a post
router.get('/', (req, res) => {

  res.status(200).json({
    ok: true,
    message: `endpoint: ${req.baseUrl}/${req.route.path}`
  });
    
});


// react to a post (toggle a reaction)
router.post('/:post_id/reaction', (req, res) => {

})


// get the latest trending moods
router.get('/moods', (req, res) => {
  
});

module.exports = router;
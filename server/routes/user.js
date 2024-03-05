const express = require('express');

const router = express.Router();

const { userService, postService, relationService, authService } = require('../services/index');

// protect routes with JWT auth
router.use(authService.passportJWT);

// retrieve user profile data
router.get('/:user_id', async (req, res) => {

  const { user_id } = req.params;

  // check input data
  if (!user_id) {
    return res.status(400).json({
      ok: false,
      error: 'user_id is missing'
    });
  }

  // retrieve user data
  const user = await userService.getUserById(user_id);

  res.status(200).json({
    ok: true,
    user: user,
    is_self: req.user.id === user_id,
  });
  
});

// update user profile data
router.post('/', async (req, res) => {

  const user_id = req.user.id;
  const { username, handle } = req.body;

  if(!username ||!handle) {
    return res.status(400).json({
      ok: false,
      error: 'username and handle are mising'
    });
  }

  const updateOptions = {
    user_id,
    username: username || None,
    handle: handle || None,
  };
  
  const newUser = await userService.updateUser(updateOptions);

  res.status(200).json({
    ok: true,
    user: newUser,
  });
    
});

router.get('/', async (req, res) => {
  const {queryString } = req.query;

  if(!queryString) {
    return res.status(400).json({
      ok: false,
      error: 'queryString is mising'
    });
  }

  const users = await userService.searchUsers({queryString});
  // TODO: search users
  res.status(200).json({
    ok: true,
    users: users,
  });
    
});

module.exports = router;
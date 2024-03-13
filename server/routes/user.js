const express = require('express');

const router = express.Router();

const { userService, postService, relationService, authService } = require('../services/index');

// protect routes with JWT auth
router.use(authService.passportJWT);

// retrieve user profile data
router.get('/:user_id', async (req, res, next) => {
  try {
    const { user_id } = req.params;
    // check input data
    if (!user_id) {
      return res.status(400).json({
        ok: false,
        error: 'user_id is missing'
      });
    }

    // retrieve user data
    let user = await userService.getUserById(user_id);

    // // retrieve user's post count
    // const postsCountForUserObj = await postService.countPostsByUserIds({user_ids: [user_id]});
    // user = user.toObject();
    // user.postCount = postsCountForUserObj[user_id.toString()];

    res.status(200).json({
      ok: true,
      user: user,
      is_self: req.user.id === user_id,
    });
    
  } catch (error) {
    next(error);
  }
  
});

// update user profile data
router.post('/', async (req, res, next) => {
  try {
    const user_id = req.user.id;
    const { username, handle } = req.body;
  
    if(!username ||!handle) {
      return res.status(400).json({
        ok: false,
        error: 'username and handle are mising'
      });
    }
  
    const updateOptions = {
      userId: user_id,
      username: username || None,
      handle: handle || None,
    };
    
    const newUser = await userService.updateUser(updateOptions);
  
    res.status(200).json({
      ok: true,
      user: newUser,
    });
  } catch (error) {
    next(error);
  }
    
});

router.get('/', async (req, res, next) => {
  try {
    const {queryString } = req.query;

    if(!queryString) {
      return res.status(400).json({
        ok: false,
        error: 'queryString is mising'
      });
    }
  
    const users = await userService.searchUsers({queryString});

    // get the count of posts for each related user //
    const userIds = users.map(user => user._id);
    const postsCountForUsersObj = await postService.countPostsByUserIds({user_ids: userIds});

    // add the count of posts to the related users
    users.forEach((user, index) => {
      users[index] = users[index].toObject();
      users[index].postCount = postsCountForUsersObj[user._id.toString()];
    });

    // TODO: search users
    res.status(200).json({
      ok: true,
      users: users,
    });
  } catch (error) {
    next(error);
  }
    
});

module.exports = router;
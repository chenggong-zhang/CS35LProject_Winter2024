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

    // check input data
    if (!username || !handle) {
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

// search users by a query string
router.get('/', async (req, res, next) => {
  try {
    const { queryString } = req.query;

    if (!queryString) {
      return res.status(400).json({
        ok: false,
        error: 'queryString is mising'
      });
    }

    const users = await userService.searchUsers({ queryString });

    // get the count of posts for each user //
    const userIds = users.map(user => user._id);
    const postsCountForUsersObj = await postService.countPostsByUserIds({ user_ids: userIds });

    // add the count of posts to each corresponding user
    users.forEach((user, index) => {
      users[index] = users[index].toObject();
      users[index].postCount = postsCountForUsersObj[user._id.toString()];
    });

    res.status(200).json({
      ok: true,
      users: users,
    });
  } catch (error) {
    next(error);
  }

});

module.exports = router;
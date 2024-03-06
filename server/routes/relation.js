const express = require('express');

const { relationService } = require('../services');

const router = express.Router();

router.get('/:user_id', async (req, res) => {

  const user_id = req.params.user_id;

  // check if user_id exists
  if(!user_id) {
    return res.status(400).json({
      ok: false,
      error: 'user_id is missing'
    });
  }

  const { followers, following } = await relationService.getRelatedUsers({userId: user_id});

  // TODO: Disconnect another user
  res.status(200).json({
    ok: true,
    followers,
    following
  });
    
});


router.post('/connect/:user_id', async (req, res) => {

  const other_user_id = req.params.user_id;
  const user_id = req.user.id;

  // check if other_user_id exists
  if(!other_user_id) {
    return res.status(400).json({
      ok: false,
      error: 'user_id (of the other user) is required'
    });
  }
  // check if user_id and other_user_id are not the same
  if(user_id === other_user_id) {
    return res.status(400).json({
      ok: false,
      error: 'cannot connect with yourself'
    });
  }

  const newRelation = await relationService.connectUser({selfUserId: user_id, friendUserId: other_user_id});

  res.status(200).json({
    ok: true,
    relation: newRelation
  });
  
});

router.post('/disconnect/:user_id', async (req, res) => {

  const other_user_id = req.params.user_id;
  const user_id = req.user.id;

  // check if other_user_id exists
  if(!other_user_id) {
    return res.status(400).json({
      ok: false,
      error: 'user_id (of the other user) is required'
    });
  }
  // check if user_id and other_user_id are not the same
  if(user_id === other_user_id) {
    return res.status(400).json({
      ok: false,
      error: 'cannot disconnect with yourself'
    });
  }

  const deletionAcknowledged = await relationService.disconnectUser({selfUserId: user_id, friendUserId: other_user_id});

  if(!deletionAcknowledged) {
    return res.status(400).json({
      ok: false,
      error: 'failed to disconnect users'
    });
  }

  // TODO: Disconnect another user
  res.status(200).json({
    ok: true,
  });
    
});


module.exports = router;
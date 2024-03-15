const express = require('express');
const https = require('https');

const { postService, relationService, authService } = require('../services')

const router = express.Router();

// protect routes with JWT auth
router.use(authService.passportJWT);

// create a post
router.post('/', async (req, res, next) => {
  try {
    const { song, artists, mood } = req.body;
    const user_id = req.user.id;

    // check if song, artists, and mood are valid
    if (!song) return res.status(400).json({ ok: false, error: 'song is missing' });
    if (!artists) return res.status(400).json({ ok: false, error: 'artists is missing' });
    if (!mood) return res.status(400).json({ ok: false, error: 'mood is missing' });

    // check if mood is one of the allowed values
    if (!postService.MOODS.includes(mood)) return res.status(400).json({ ok: false, error: 'invalid mood' });

    // retrieve the first youtube video id under a search with song and artists
    const ytVideoId = await getYoutubeSearchResults(song, artists);

    // create a new post in the database
    const newPost = await postService.createPost({ user_id, song, artists, mood, yt_link: `https://www.youtube.com/watch?v=${ytVideoId}` });

    res.status(200).json({
      ok: true,
      post: newPost
    });

  } catch (error) {
    next(error);
  }

});


// get posts (feed or a user's posts)
router.get('/', async (req, res, next) => {
  try {
    const { limit, offset, user_id: other_user_id } = req.query;
    const user_id = req.user.id;

    if (other_user_id) {
      // if other_user_id is provided, get posts from that user
      const opts = {
        limit: limit || 20,
        offset: offset || 0,
        sort: { created_at: -1 }
      };
      const posts = await postService.getPostsByUser(other_user_id, opts);

      res.status(200).json({
        ok: true,
        posts
      });

    } else {
      // if other_user_id is NOT provided, get post feed for the current user
      const opts = {
        limit: limit || 20,
        offset: offset || 0,
        sort: { created_at: -1 }
      };

      // get the user's followed user ids
      const followed_user_ids = await relationService.getUserIdsSelfFollows({ userId: user_id });

      // get the posts for the followed users
      const posts = await postService.getFeedPosts(followed_user_ids, opts);

      res.status(200).json({
        ok: true,
        posts
      });
    }

  } catch (error) {
    next(error);
  }

});


// react to a post (toggle a reaction)
router.post('/:post_id/reaction', async (req, res, next) => {
  try {
    const { post_id } = req.params;
    const { reaction } = req.body;
    const user_id = req.user.id;

    // check post_id and reaction are valid
    if (!post_id) return res.status(400).json({ ok: false, error: 'post_id is missing' });
    if (!reaction) return res.status(400).json({ ok: false, error: 'reaction is missing' });
    if (!['like', 'handshake', 'fire', 'sad', 'lol', 'gg'].includes(reaction)) return res.status(400).json({ ok: false, error: 'invalid reaction' });

    const updatedPost = await postService.reactToPost({ post_id, user_id, reaction });

    res.status(200).json({
      ok: true,
      post: updatedPost
    });

  } catch (error) {
    next(error);
  }
})


// get trending moods (sorted counts of posts for each mood)
router.get('/moods', async (req, res, next) => {
  try {
    const sortedMoods = await postService.getTrendingMoods({ createdAfter: new Date(Date.now() - 24 * 60 * 60 * 1000) });

    res.status(200).json({
      ok: true,
      moods: sortedMoods
    });

  } catch (error) {
    next(error);
  }
});


// helper function

/**
 * Get relevant youtube video id for a given song and artists.
 *
 * @param  {string} song - The song name.
 * @param  {string} artists - The artists name.
 * 
 * @returns A promise that resolves to the first youtube video id under a search with song and artists.
 */
async function getYoutubeSearchResults(song, artists) {
  const url = `https://www.googleapis.com/youtube/v3/search?part=id&q=${song}+${artists}&key=${process.env.YOUTUBE_API_KEY}&type=video&part=snippet&maxResults=1`;
  return new Promise((resolve) => {
    let data = '';
    https.get(url, (res) => {
      res.on('data', chunk => { data += chunk });
      res.on('error', (err) => { console.error(err) });
      res.on('end', () => {
        resolve(JSON.parse(data).items[0].id.videoId);
      });
    });
  });
}
module.exports = router;
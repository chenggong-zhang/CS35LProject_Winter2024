const { Post } = require('../models');

const MOODS = ['😄 happy', '😢 sad', '😴 tired', '😠 angry', '🌈 hopeful', '😰 anxious', '✨ inspired', '🧘 calm', '🤩 excited', '😂 amused'];

/**
 * Create a new post and return the created post object
 * 
 * @param   {string}  user_id     the id of the user who created the post
 * @param   {string}  song        the name of the song
 * @param   {string}  artists     the name of the artists
 * @param   {string}  mood        the mood of the post
 * @param   {string}  yt_link     the link to the youtube video
 *  
 * @returns {Object}              the created post object
 */
async function createPost({ user_id, song, artists, mood, yt_link }) {
    const post = await Post.create({ user_id, song, artists, mood, yt_link });
    return post;
}

/**
 * Get all posts created by a user
 * 
 * @param   {string}  user_id     the id of the user who created the post
 * @param   {number}  limit       the number of posts to return
 * @param   {number}  offset      the number of posts to skip
 * @param   {Object}  sort        the sorting criteria for the posts
 *  
 * @returns {Object[]}            the list of post objects created by the user
 */
async function getPostsByUser(user_id, { limit, offset, sort = { created_at: -1 } }) {
    const posts = await Post.find({ user_id })
        .sort(sort)
        .skip(offset)
        .limit(limit)
        .populate({ path: 'user_id', select: { _id: 1, username: 1, handle: 1 } }) // populate post creator's user data

    return posts;
}

/**
 * Get feed posts from a list of friends
 * 
 * @param   {string[]}  friend_user_ids     the ids of users to get the feed from
 * @param   {number}  limit       the number of posts to return
 * @param   {number}  offset      the number of posts to skip
 * @param   {Object}  sort        the sorting criteria for the posts
 *  
 * @returns {Object[]}            the list of post objects created by the friends
 */
async function getFeedPosts(friend_user_ids, { limit, offset, sort = { created_at: -1 } }) {

    const posts = await Post.find({ user_id: { $in: friend_user_ids } })
        .sort(sort)
        .skip(offset)
        .limit(limit)
        .populate({ path: 'user_id', select: { _id: 1, username: 1, handle: 1 } }) // populate post creator's user data

    return posts;
}

/**
 * Toggle a reaction on a post
 * 
 * @param   {string}  post_id     the id of the post to react to
 * @param   {string}  user_id     the id of the user who reacted
 * @param   {string}  reaction    the reaction to add or remove
 * 
 * @returns {Object}              the updated post object
 */
async function reactToPost({ post_id, user_id, reaction }) {
    const post = await Post.findById(post_id);

    switch (reaction) {
        case 'like':
            if (!post.like_by.includes(user_id)) {
                post.like_by.push(user_id);
            } else {
                post.like_by = post.like_by.filter(u => u.toString() !== user_id);
            }
            break;
        case 'handshake':
            if (!post.handshake_by.includes(user_id)) {
                post.handshake_by.push(user_id);
            } else {
                post.handshake_by = post.handshake_by.filter(u => u.toString() !== user_id);
            }
            break;
        case 'fire':
            if (!post.fire_by.includes(user_id)) {
                post.fire_by.push(user_id);
            } else {
                post.fire_by = post.fire_by.filter(u => u.toString() !== user_id);
            }
            break;
        case 'sad':
            if (!post.sad_by.includes(user_id)) {
                post.sad_by.push(user_id);
            } else {
                post.sad_by = post.sad_by.filter(u => u.toString() !== user_id);
            }
            break;
        case 'lol':
            if (!post.lol_by.includes(user_id)) {
                post.lol_by.push(user_id);
            } else {
                post.lol_by = post.lol_by.filter(u => u.toString() !== user_id);
            }
            break;
        case 'gg':
            if (!post.gg_by.includes(user_id)) {
                post.gg_by.push(user_id);
            } else {
                post.gg_by = post.gg_by.filter(u => u.toString() !== user_id);
            }
            break;
        default:
            break;
    }

    await post.save();
    return post;
}

/**
 * Get the trending moods across plattform
 * 
 * @param  {Date}  createdAfter    DEPRECATE! the date after which posts should be considered for trending moods
 * 
 * @returns {Object[]}             A sorted array of objects containing mood and count
 */
async function getTrendingMoods({ createdAfter }) {
    const moods = await Post.aggregate([
        {
            $match: {
                created_at: {
                    $gte: new Date('2022-01-01T00:00:00.00Z') //createdAfter
                }
            }
        },
        {
            $group: {
                _id: '$mood',
                count: { $sum: 1 }
            }
        }
    ]);


    // sort moods by count
    const sorted_moods = moods.sort((a, b) => b.count - a.count);

    return sorted_moods;
}

/**
 * Count the number of posts created by a list of users
 * 
 * @param  {string[]}  user_ids    the ids of users to count the posts for
 * 
 * @returns {Object}               an object with user_id as key and count as value
 */
async function countPostsByUserIds({ user_ids }) {
    const userPostsCount = await Post.aggregate([
        {
            $match: {
                user_id: {
                    $in: user_ids
                }
            }
        },
        {
            $group: {
                _id: '$user_id',
                count: { $sum: 1 }
            }
        }
    ]);

    // return an object with user_id as key and count as value
    return userPostsCount.reduce((acc, cur) => {
        acc[cur._id.toString()] = cur.count;
        return acc;
    }, {});
}


module.exports = {
    createPost,
    getPostsByUser,
    getFeedPosts,
    reactToPost,
    getTrendingMoods,
    countPostsByUserIds,
    MOODS
}
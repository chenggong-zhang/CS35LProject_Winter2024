const { Post } = require('../models');

const MOODS = ['😄 happy', '😢 sad', '😴 tired', '😠 angry', '🌈 hopeful', '😰 anxious', '✨ inspired', '🧘 calm', '🤩 excited', '😂 amused'];

async function createPost({user_id, song, artists, mood}) {
    const post = await Post.create({user_id, song, artists, mood});
    return post;    
}

async function getPostsByUser(user_id, {limit, offset, sort={created_at: -1}}) {
    const posts = await Post.find({user_id})
        .sort(sort)
        .skip(offset)
        .limit(limit)
        .populate({path: 'user_id', select: {_id: 1, username: 1, handle: 1}})
        // .populate('like_by')
        // .populate('handshake_by')
        // .populate('fire_by')
        // .populate('sad_by')
        // .populate('lol_by')
        // .populate('gg_by');

    return posts;
}

async function getFeedPosts(friend_user_ids, {limit, offset, sort={created_at: -1}}) {

    const posts = await Post.find({user_id: {$in: friend_user_ids}})
        .sort(sort)
        .skip(offset)
        .limit(limit)
        .populate({path: 'user_id', select: {_id: 1, username: 1, handle: 1}})
        // .populate('like_by')
        // .populate('handshake_by')
        // .populate('fire_by')
        // .populate('sad_by')
        // .populate('lol_by')
        // .populate('gg_by');

    return posts;
}

// add a reaction if not already added
// remove a reaction if already added
async function reactToPost({post_id, user_id, reaction}) {
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
        case'sad':
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

async function getTrendingMoods({createdAfter}) {
    const moods = await Post.aggregate([
        {
            $match: {
            //   _id: {
            //     $in: friend_user_ids
            //   },
              created_at: {
                $gte: createdAfter
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

    // const sorted_moods = Object.entries(posts).sort((a, b) => b[1] - a[1]);

    // sort moods by count
    const sorted_moods = moods.sort((a, b) => b.count - a.count);

    return sorted_moods;
}



module.exports = {
    createPost,
    getPostsByUser,
    getFeedPosts,
    reactToPost,
    getTrendingMoods,
    MOODS
}
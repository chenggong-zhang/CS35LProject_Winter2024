const mongoose = require('mongoose');

const postSchema = new mongoose.Schema(
    {
        user_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        song: {
            type: String,
            required: true,
        },
        artists: {
            type: String,
            required: true,
        },
        yt_link: {
            type: String,
        },
        mood: {
            type: String,
            required: true,
            enum: ['😄 happy', '😢 sad', '😴 tired', '😠 angry', '🌈 hopeful', '😰 anxious', '✨ inspired', '🧘 calm', '🤩 excited', '😂 amused'],
        },
        like_by: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        }],
        handshake_by: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        }],
        fire_by: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        }],
        sad_by: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        }],
        lol_by: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        }],
        gg_by: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        }],
    },
    {
        timestamps: {
            createdAt: 'created_at',
            updatedAt: 'updated_at'
        },
    }
);

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
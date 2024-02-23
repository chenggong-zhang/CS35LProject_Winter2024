const mongoose = require('mongoose');

const postSchema = new mongoose.Schema(
    {
        user: {
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
        mood: {
            type: String,
            required: true,
            enum: ['😄 happy', '😢 sad', '😴 tired', '😠 angry', '🌈 hopeful', '😰 anxious', '✨ inspired', '🧘 calm', '🤩 excited', '😂 amused'],
        },
        liked_by: [{
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
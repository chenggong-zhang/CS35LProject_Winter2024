const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true,
        },
        handle: {
            type: String,
            unique: true,
            sparse: true, // allow for null values
        },
        username: {
            type: String,
        }
    },
    {
        timestamps: {
            createdAt: 'created_at',
            updatedAt: 'updated_at'
        },
    }
);

const User = mongoose.model('User', userSchema);

module.exports = User;
const mongoose = require('mongoose');

const relationSchema = new mongoose.Schema(
    {
        user1_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        user2_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
    },
    {
        timestamps: {
            createdAt: 'created_at',
            updatedAt: 'updated_at'
        },
    }
);

const Relation = mongoose.model('Relation', relationSchema);

module.exports = Relation;
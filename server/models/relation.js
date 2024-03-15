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

// Add compound unique index on user1_id and user2_id;
// this will prevent the creation of duplicate relations
Relation.createIndexes({ user1_id: 1, user2_id: 1 }, { unique: true });

module.exports = Relation;
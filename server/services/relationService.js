const { Relation } = require('../models');

async function connectUser({selfUserId, friendUserId}) {
    // check if a relation already exists between the two users
    const relation = await Relation.findOne({
        user1_id: selfUserId, 
        user2_id: friendUserId
    });

    if (relation) {
        return relation;
    }

    // create a new relation if none exists
    const newRelation = await Relation.create({
        user1_id: selfUserId,
        user2_id: friendUserId,
    });

    return newRelation;
}

// get followings and followersof a user
async function getRelatedUsers({userId}) {

    const usersFollowedBySelf = await Relation.find({
        user1_id: userId
    }).populate('user2_id');

    const usersSelfFollows = await Relation.find({
        user2_id: userId
    }).populate('user1_id');

    return {
        following: usersFollowedBySelf.map(relation => relation.user2_id),
        followers: usersSelfFollows.map(relation => relation.user1_id)
    };
}

// get ids of users that self follows
async function getUserIdsSelfFollows({userId}) {
    const userIdsFollowedBySelf = await Relation.find({
        user1_id: userId
    }).select('user2_id');

    return userIdsFollowedBySelf.map(relation => relation.user2_id);
}

async function disconnectUser({selfUserId, friendUserId}) {
    // unfollow the other user
    const relation = await Relation.deleteOne({
        user1_id: selfUserId, user2_id: friendUserId 
    });

    return relation.acknowledged;
}


module.exports = {
    connectUser,
    getRelatedUsers,
    getUserIdsSelfFollows,
    disconnectUser
}
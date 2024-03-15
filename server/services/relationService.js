const { Relation } = require('../models');

/**
 * Connect a user to another user by creating a new relation
 *
 * @param   {string}  selfUserId       The id of the user who is following
 * @param   {string}  friendUserId     The id of the user who is being followed 
 * 
 * @returns {Object}                   A relation object of the new connection
*/
async function connectUser({ selfUserId, friendUserId }) {
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


/**
 * Get all user ids that is related to the user (following or followed)
 *
 * @param   {string}  userId           the user's id
 * 
 * @returns {following: string[], 
 *           followers: string[]}   A list of user ids that the user follows a list of user ids that follow the user
*/
async function getRelatedUsers({ userId }) {

    const usersFollowedBySelf = await Relation.find({
        user1_id: userId
    }).populate({ path: 'user2_id', select: { _id: 1, username: 1, handle: 1 } });

    const usersSelfFollows = await Relation.find({
        user2_id: userId
    }).populate({ path: 'user1_id', select: { _id: 1, username: 1, handle: 1 } });

    return {
        following: usersFollowedBySelf.map(relation => relation.user2_id),
        followers: usersSelfFollows.map(relation => relation.user1_id)
    };
}

/**
 * Get all user ids that the user follows
 *
 * @param   {string}  userId           user's own id
 * 
 * @returns {string[]}                 A list of user ids that the user follows
*/
async function getUserIdsSelfFollows({ userId }) {
    const userIdsFollowedBySelf = await Relation.find({
        user1_id: userId
    }).select('user2_id');

    return userIdsFollowedBySelf.map(relation => relation.user2_id);
}

/**
 * Disonnect a user to another user by creating a new relation
 *
 * @param   {string}  selfUserId       The id of the user who is unfollowing
 * @param   {string}  friendUserId     The id of the user who is being unfollowed
 * 
 * @returns {boolean}                  A boolean indicating if the unfollow was successful
*/
async function disconnectUser({ selfUserId, friendUserId }) {
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
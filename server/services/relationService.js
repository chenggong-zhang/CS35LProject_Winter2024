const { Relation } = require('../models');

async function connectUser({selfUserId, friendUserId}) {
    // check if a relation already exists between the two users
    const relation = await Relation.find({
        $or: [
            {user1_id: selfUserId, user2_id: friendUserId}, 
            {user1_id: friendUserId, user2_id: selfUserId}
        ]
    });

    if (relation.length > 0) {
        return relation[0];
    }

    // create a new relation if none exists
    const newRelation = await Relation.create({
        user1_id: selfUserId,
        user2_id: friendUserId,
    });

    return newRelation;
}

async function getFriendIds(userId) {
    // find all relations of the user
    const relations = await Relation.find({
        $or: [ {user1_id: userId}, {user2_id: userId} ]
    });

    // get the ids of the other users in the relations
    const friendIds = relations.map(relation => {
        if (relation.user1_id === userId) {
            return relation.user2_id;
        } else {
            return relation.user1_id;
        }
    });

    return friendIds;
}

async function disconnectUser({selfUserId, friendUserId}) {
    // find the relation between the two users
    const relation = await Relation.deleteMany({
        $or: [
            {user1_id: selfUserId, user2_id: friendUserId}, 
            {user1_id: friendUserId, user2_id: selfUserId}
        ]
    });

    return relation.acknowledged;
}


module.exports = {
    connectUser,
    getFriendIds,
    disconnectUser
}
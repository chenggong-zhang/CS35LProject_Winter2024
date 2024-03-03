const { User } = require('../models');

async function upsertUser({email}) {
    const user = await User.findOne({email});
    if (user) {
        return user;
    }
    
    // generate a random handle for the user if it doesn't exist
    // the handle is the first part of the email address followed by a random number between 1 and 1000
    const handle = `${email.split('@')[0]}_${Math.floor(Math.random() * (1000) + 1)}`; 

    // using the handle as the username for new users
    const username = handle;

    const newUser = await User.create({email, handle, username});
    return newUser;
}

async function getUserById(userId) {
    const user = await User.findById(userId);
    if (!user) {
        throw new Error('User not found');
    }
    return user;
}

async function getUserByHandle(handle) {
    const user = await User.findOne({handle});
    if (!user) {
        throw new Error('User not found');
    }
    return user;
}


// users are only allowed to update handle and username
async function updateUser({userId, handle, username}) {
    const user = await User.findById(userId);

    if(!user) {
        throw new Error('User not found');
    }

    user.handle = handle || user.handle;
    user.username = username || user.username;

    await user.save();
    return user;
}

async function searchUsers({queryString}) {
    const regex = new RegExp(queryString, 'i');
    const users = await User.find({$or: [{handle: regex}, {username: regex}]});
    return users;
}

async function deleteUser(userId) {
    const user = await User.findById(userId);
    if (!user) {
        throw new Error('User not found');
    }
    await user.remove();
}

module.exports = {
    upsertUser,
    getUserById,
    getUserByHandle,
    updateUser,
    searchUsers,
    deleteUser
};
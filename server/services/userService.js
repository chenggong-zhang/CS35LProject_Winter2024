const { User } = require('../models');


/**
 * Create or retrieve a user by email. 
 * 
 * @param   {string}  email   the user's email
 * 
 * @returns {Object}          the user object
*/
async function upsertUser({ email }) {
    const user = await User.findOne({ email });
    if (user) {
        return user;
    }

    // generate a random handle for the user if it doesn't exist
    // the handle is the first part of the email address followed by a random number between 1 and 1000
    const handle = `${email.split('@')[0]}_${Math.floor(Math.random() * (1000) + 1)}`;

    // using the handle as the username for new users
    const username = handle;

    const newUser = await User.create({ email, handle, username });
    return newUser;
}

/**
 * Get a user by their id. 
 * 
 * @param   {string}  userId   the user's id
 * 
 * @returns {Object}          the user object
*/
async function getUserById(userId) {
    const user = await User.findById(userId).select({ _id: 1, username: 1, handle: 1 });
    if (!user) {
        throw new Error('User not found');
    }
    return user;
}

/**
 * Get a user by their handle. 
 * 
 * @param   {string}  handle   the user's handle
 * 
 * @returns {Object}          the user object
*/
async function getUserByHandle(handle) {
    const user = await User.findOne({ handle }).select({ _id: 1, username: 1, handle: 1 });
    if (!user) {
        throw new Error('User not found');
    }
    return user;
}

/**
 * Update a user's handle and/or username. 
 * 
 * @param   {string}  userId   the user's id
 * @param   {string}  handle   the user's new handle (optional)
 * @param   {string}  username the user's new username (optional)
 * 
 * @returns {Object}          the updated user object
*/
async function updateUser({ userId, handle, username }) {
    const user = await User.findById(userId).select({ _id: 1, username: 1, handle: 1 });

    if (!user) {
        throw new Error('User not found');
    }

    user.handle = handle || user.handle;
    user.username = username || user.username;

    await user.save();
    return user;
}

/**
 * Search for users by handle or username. 
 * 
 * @param   {string}  queryString  the search query string
 * 
 * @returns {Object[]}             an array of matching user objects
*/
async function searchUsers({ queryString }) {
    const regex = new RegExp(queryString, 'i');
    const users = await User.find({ $or: [{ handle: regex }, { username: regex }] }).select({ _id: 1, username: 1, handle: 1 });
    return users;
}

/**
 * Delete a user by their id. 
 * 
 * @param   {string}  userId   the user's id
 * 
 * @returns {boolean}          true if the user was deleted, false otherwise
*/
async function deleteUser(userId) {
    const user = await User.findById(userId);
    if (!user) {
        throw new Error('User not found');
    }
    await user.remove();
}

/**
 * Get all users. 
 * 
 * @returns {Object[]}         an array of all user objects
*/
async function getAllUsers() {
    const users = await User.find();
    return users || [];
}

module.exports = {
    upsertUser,
    getUserById,
    getUserByHandle,
    updateUser,
    searchUsers,
    deleteUser,
    getAllUsers
};
'use strict';

const User = require('./../../models/user');
const Image = require('./../../models/image');

module.exports = {
    user: async(parent, args, context, info) => {
        if (args.id) {
            const user = await User.where('id', args.id).first();
            return user ? user.toJSON() : null;
        } else if (args.username) {
            const user = await User.where('username', args.username).first();
            return user ? user.toJSON() : null;
        } else {
            return null;
        }
    },
    users: async(parent, args, context, info) => {
        return (await User.get()).toJSON();
    },
    image: async(parent, args, context, info) => {
        return (await Image.where('id', args.id).first()).toJSON();
    },
    role: async(parent, args, context, info) => {
        return (await Role.where('name', args.name).first()).toJSON();
    },
};
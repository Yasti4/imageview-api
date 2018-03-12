'use strict';

const {
    User,
    Image
} = require('./../../models');

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
    updateUser: async(rootValue, { username, input }) => {
        const user = await User.where('username', username).first();
        console.log(input);
        if (!user) {
            return null;
        }
        for (const key in input) {
            if (input.hasOwnProperty(key)) {
                user.set(key, input[key])
            }
        }
        user.save();
        return user.toJSON();

    }
};
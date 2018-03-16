'use strict';


const {
    User,
    Tag
} = require('./../../models');

module.exports = {
    tag: async(parent, args, context, info) => {
        if (args.id) {
            const tag = await Tag.where('id', args.id).first();
            return tag ? tag.toJSON() : null;
        } else if (args.name) {
            const tag = await Tag.where('name', args.name).first();
            return tag ? tag.toJSON() : null;
        } else {
            return null;
        }
    },
    tags: async(parent, args, context, info) => {
        return (await Tag.get()).toJSON();
    },
    search: async(parent, args, context, info) => {
        const users = (await User.whereLike('username', `%${args.search}%`).get()).toJSON();
        const tags = (await Tag.whereLike('name', `%${args.search}%`).get()).toJSON();
        return [...users, ...tags];
    },
};
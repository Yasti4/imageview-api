'use strict';

module.exports = {
    album: (parent, args, context, info) => {
        return context.db.Album.find({
            where: {
                id: args.id
            }
        });
    },
    albums: (parent, args, context, info) => {
        return context.db.Album.findAll({
            where: args.userId ? {
                user_id: args.userId
            } : {},
            limit: args.limit || 10
        });
    },
};
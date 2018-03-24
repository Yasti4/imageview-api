'use strict';

module.exports = {
    album: async(parent, args, context, info) => {
        if (args.id) {
            return context.db.Album.find({ where: { 'id': args.id } });
        }
    },
    albums: async(parent, args, context, info) => {
        return context.db.Album.findAll();
    },
};
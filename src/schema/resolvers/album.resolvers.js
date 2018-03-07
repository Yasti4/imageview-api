'use strict';

const Album = require('./../../models/album');

module.exports = {
    album: async(parent, args, context, info) => {
        if (args.id) {
            const album = await Album.where('id', args.id).first();
            return album ? album.toJSON() : null;
        } else {
            return null;
        }
    },
    albums: async(parent, args, context, info) => {
        return (await Album.get()).toJSON();
    },
};
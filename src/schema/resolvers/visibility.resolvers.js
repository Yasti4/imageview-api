'use strict';

const Visibility = require('./../../models/visibility');

module.exports = {
    visibility: async(parent, args, context, info) => {
        if (args.name) {
            const visibility = await Visibility.where('name', args.name).first();
            return visibility ? visibility.toJSON() : null;
        } else {
            return null;
        }
    },
    visibilities: async(parent, args, context, info) => {
        return (await Visibility.get()).toJSON();
    },
};
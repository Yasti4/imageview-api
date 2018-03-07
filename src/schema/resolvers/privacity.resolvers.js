'use strict';


const {
    Privacity
} = require('./../../models');

module.exports = {
    privacity: async(parent, args, context, info) => {
        if (args.id) {
            const privacity = await Privacity.where('id', args.id).first();
            return privacity ? privacity.toJSON() : null;
        } else if (args.user_id) {
            const privacity = await Privacity.where('user_id', args.user_id).first();
            return privacity ? privacity.toJSON() : null;
        } else {
            return null;
        }
    },
    privacities: async(parent, args, context, info) => {
        return (await Privacity.get()).toJSON();
    },
};
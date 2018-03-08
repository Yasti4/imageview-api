'use strict';

const Role = require('./../../models/role');

module.exports = {
    role: async(parent, args, context, info) => {
        if (args.name) {
            const role = await Role.where('name', args.name).first();
            return role ? role.toJSON() : null;
        } else {
            return null;
        }
    },
    roles: async(parent, args, context, info) => {
        return (await Role.get()).toJSON();
    },
};
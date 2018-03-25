'use strict';

const Role = require('./../../models/role');

module.exports = {
    role: (parent, args, context, info) => {
        return context.db.Role.find({ where: { 'name': args.name } });
    },
    roles: (parent, args, context, info) => {
        return context.db.Role.findAll();
    },
    createRole: async(parent, args, context, info) => {
        const result = await new Role().save(args);
        return result.attributes;
    },
    updateRole: async(parent, { oldName, newName }, context, info) => {
        const idAttribute = Role.prototype.idAttribute;
        const affectedRows = await context.db(Role.prototype.tableName)
            .where(idAttribute, oldName)
            .update({
                [idAttribute]: newName
            });
        return affectedRows > 0;
    },
};
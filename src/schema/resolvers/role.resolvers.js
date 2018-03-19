'use strict';

const Role = require('./../../models/role');

module.exports = {
  role: async (parent, args, context, info) => {
    const role = await Role.where('name', args.name).first();
    return role ? role.toJSON() : null;
  },
  roles: async (parent, args, context, info) => {
    return (await Role.get()).toJSON();
  },
  createRole: async (parent, args, context, info) => {
    const result = await new Role().save(args);
    return result.attributes;
  },
  updateRole: async (parent, { oldName, newName }, context, info) => {
    const idAttribute = Role.prototype.idAttribute;
    const affectedRows = await context.db(Role.prototype.tableName)
      .where(idAttribute, oldName)
      .update({ [idAttribute]: newName });
    return affectedRows > 0;
  },
};

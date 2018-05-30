'use strict';

module.exports = {
  createRole: (parent, args, context, info) => {
    return context.db.Role.create(args);
  },
  updateRole: async (parent, args, context, info) => {
    const affectedRows = await context.db.Role.update({ name: args.newName }, { where: { name: args.oldName } });
    return !!affectedRows[0];
  },
  deleteRole: async (parent, args, context, info) => {
    const affectedRows = await context.db.Role.destroy({ where: { name: args.name } });
    return !!affectedRows;
  }
};

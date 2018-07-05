'use strict';

module.exports = {
  createRole: (parent, args, context) => {
    return !context.isAdmin ? false : context.db('roles').insert(args);
  },
  updateRole: async (parent, args, context) => {
    return !context.isAdmin ? false : context.db('roles').update(args.oldName, args.newName);
  },
  deleteRole: async (parent, args, context) => {
    return !context.isAdmin ? false : context.db('roles').delete(args.name);
  }
};

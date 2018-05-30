'use strict';

module.exports = {
  createPrivacity: (parent, args, context, info) => {
    return context.db.Privacity.create(args.input);
  },
  updatePrivacity: async (parent, args, context, info) => {
    const affectedRows = await context.db.Privacity.update(
      args.input, { where: { user_id: args.input.user_id } });
    return !!affectedRows[0];
  }
};

'use strict';

module.exports = {
  createComment: (parent, args, context, info) => {
    args.input.user_id = context.userAuth.id;
    return context.db.Comment.create(args.input);
  },
  updateComment: async (parent, args, context, info) => {
    const canUpdate = context.isAdmin ? {} : { user_id: context.userAuth.id };
    const affectedRows = await context.db.Comment.update({comment: args.comment}, { where: { id: args.id, ...canUpdate } });
    return !!affectedRows[0];
  }
};

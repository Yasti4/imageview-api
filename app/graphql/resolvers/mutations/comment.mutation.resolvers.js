'use strict';

module.exports = {
  createComment: async (parent, args, context) => {
    const id = await context.actions.comments.create(Object.assign({}, args.input, {user_id: context.userAuth.id}));
    return context.actions.comments.findById(id);
  },
  updateComment: async (parent, args, context) => {
    return context.isAdmin
      ? context.actions.comments.updateById(args.id, {comment: args.content}, args.withTrashed)
      : context.actions.comments.updateByIdAndUserId(args.id, context.userAuth.id, {comment: args.content}, args.withTrashed);
  },
  deleteComment: async (parent, args, context) => {
    return args.softDelete
      ? context.actions.comments.deleteById(args.id, args.softDelete)
      : context.actions.comments.deleteByIdAndUserId(args.id, context.userAuth.id, args.softDelete);
  }
};

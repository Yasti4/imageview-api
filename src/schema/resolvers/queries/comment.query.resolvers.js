'use strict';

module.exports = {
  comment: (parent, args, context, info) => {
    return context.db.Comment.find({
      where: { id: args.id }
    });
  },
  comments: (parent, args, context, info) => {
    return context.db.Comment.findAll({
      where: {
        ...args.userId ? { user_id: args.userId } : {},
        ...args.postId ? { post_id: args.postId } : {}
      },
      limit: args.limit || 10
    });
  }
};

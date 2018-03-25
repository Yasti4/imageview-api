'use strict';

module.exports = {
  post: (parent, args, context, info) => {
    return context.db.Post.find({
      where: {
        id: args.id
      }
    });
  },
  posts: (parent, args, context, info) => {
    return context.db.Post.findAll({
      where: {
        ...args.userId ? {
          user_id: args.userId
        } : {},
        ...args.albumId ? {
          album_id: args.albumId
        } : {},
      },
      limit: args.limit || 10
    });
  }
};

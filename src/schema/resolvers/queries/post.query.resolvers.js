'use strict';
const { pagination } = require('./../../../helpers');

module.exports = {
  post: (parent, args, context, info) => {
    return context.db.Post.find({
      where: { id: args.id }
    });
  },
  posts: (parent, args, context, info) => {
    return context.db.Post.findAll({
      where: {
        ...args.userId ? { user_id: args.userId } : {},
        ...args.albumId ? { album_id: args.albumId } : {}
      },
      limit: args.limit || 10
    });
  },
  feed: (parent, args, context, info) => {
    // No auth
    if (!context.isAuth) {
      console.log(context.db.Post.associations);
      return context.db.Post.findAll({
        include: [
          {
            model: context.db.User,
            as: 'likes',
            attributes: [],
            through: {
              
              attributes: ['id']
            }
          }
        ],
        ...pagination(args.pagination, args.limit)
      });
    }
  }
};

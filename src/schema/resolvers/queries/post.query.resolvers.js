'use strict';
// const { pagination } = require('./../../../helpers');

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
  feed: async (parent, args, context, info) => {
    // No auth
    if (!context.isAuth) {
      /* var b = await context.db.LikePost.count({
        attributes: ['post_id'],
        group: ['post_id'],
        include: [
          { 
            model: context.db.Post,
            as: 'post',
            order: 'created_at ASC'
          }
        ]
      }); */
      // SELECT post_id, count(*) as max FROM likes_posts group by post_id order by max DESC ;
      var sequelize = context.db.sequelize;
      
      var idsPostLike = (await context.db.LikePost.findAll(
        {
          attributes: ['post_id', [sequelize.fn('count', sequelize.col('id')), 'likecount']],
          group: 'post_id',
          order: [
            [[sequelize.literal('likecount'), 'DESC']]
          ]
        }
      ).map(item => {
        delete item.likecount;
        return item;
      }
      ));
      
      return idsPostLike;
    }
  }
};

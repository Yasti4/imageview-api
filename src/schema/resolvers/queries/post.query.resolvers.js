'use strict';
const { orderBy } = require('./../../../helpers');

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
    return context.isAuth ? getAuthFeed(context) : getFeed(context); 
  }
};

async function getAuthFeed (context) {
  const userIds = (await context.db.SubscriptionUser.findAll({
    attributes: ['user_followed'],
    where: {
      user_follower: context.userAuth.id
    }
  })).map((item) => { return item.user_followed; });

  const op = context.db.Sequelize.Op;
  const postIds = (await context.db.Post.findAll({
    attributes: ['id'],
    where: {
      user_id: {
        [op.in]: userIds
      }
    }
  })).map((item) => { return item.id; });

  return getFeed(context, postIds);
}

async function getFeed (context, ids = []) {
  const popularsIds = await getPopularPostIds(context, ids);
  const recentsIds = await getRecentPostIds(context, ids);
  ids = [...new Set([...popularsIds, ...recentsIds])];
  
  const op = context.db.Sequelize.Op;
 
  return context.db.Post.findAll({
    where: {
      id: {
        [op.in]: ids
      }
    },
    order: context.db.sequelize.random()
  });
}
async function getRecentPostIds (context, ids = []) {
  const op = context.db.Sequelize.Op;
  const items = await context.db.Post.findAll({
    attributes: ['id'],
    ...!ids.length ? {} : {
      where: {
        id: {
          [op.in]: ids
        }
      }
    },
    ...orderBy()
  }).map(item => { return item.id; });
  return items;
}

async function getPopularPostIds (context, ids = []) {
  const sequelize = context.db.sequelize;
  const op = context.db.Sequelize.Op;
  const items = (await context.db.LikePost.findAll(
    {
      attributes: ['post_id', [sequelize.fn('count', sequelize.col('id')), 'likecount']],
      ...!ids.length ? {} : {
        where: {
          post_id: {
            [op.in]: ids
          }
        }
      },
      group: 'post_id',
      order: [
        [[sequelize.literal('likecount'), 'DESC']]
      ],
      limit: 20
    }
  ).map(item => { return item.post_id; }
  ));
  return items;
}

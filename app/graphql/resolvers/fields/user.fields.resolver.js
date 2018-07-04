'use strict';

module.exports = {
  User: {
    image: async (parent, args, context) => {
      return context.db('images').first('file_id', parent.file_id);
    },
    following: async (parent, args, context) => {
      const ids = await context.db('subscriptions_users').where('user_follower', parent.id)
        .select('user_followed').map(item => item.user_followed).all();
      return context.db('users').whereIn('id', ids).all();
    },
    followers: async (parent, args, context) => {
      const ids = await context.db('subscriptions_users').where('user_followed', parent.id)
        .select('user_follower').map(item => item.user_follower).all();
      return context.db('users').whereIn('id', ids).all();
    },
    posts: (parent, args, context) => {
      return context.db('posts').all('user_id', parent.id);
    },
    postsLikes: async (parent, args, context) => {
      const count = await context.db('likes_posts').where('user_id', parent.id).select('id').all();
      return count.length;
    },
    albums: (parent, args, context) => {
      return context.db('albums').all('user_id', parent.id);
    },
    albumsLikes: async (parent, args, context) => {
      const count = await context.db('likes_albums').where('user_id', parent.id).select('id').all();
      return count.length;
    },
    albumsSubscriptions: async (parent, args, context) => {
      const count = await context.db('subscriptions_albums').where('user_id', parent.id).select('id').all();
      return count.length;
    },
    comments: (parent, args, context) => {
      return context.db('comments').all('user_id', parent.id);
    },
    commentsLikes: async (parent, args, context) => {
      const count = await context.db('likes_comments').where('user_id', parent.id).select('id').all();
      return count.length;
    }
  }
};

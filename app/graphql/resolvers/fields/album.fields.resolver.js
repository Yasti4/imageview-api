'use strict';

module.exports = {
  Album: {
    posts: (parent, args, context) => {
      return context.db('posts').all('album_id', parent.id);
    },
    subscribers: async (parent, args, context) => {
      const ids = await context.db('subscriptions_albums').where('id', parent.id)
        .select('user_id').map(item => item.user_id).all();
      return context.db('users').whereIn('id', ids).all();
    },
    likes: async (parent, args, context) => {
      const count = await context.db('likes_albums').select('id').all('album_id', parent.id);
      return count.length;
    }
  }
};

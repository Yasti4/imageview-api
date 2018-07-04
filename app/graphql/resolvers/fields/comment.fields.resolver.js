'use strict';

module.exports = {
  Comment: {
    user: (parent, args, context) => {
      return context.db('users').first('id', parent.user_id);
    },
    post: async (parent, args, context) => {
      return context.db('posts').first('id', parent.post_id);
    },
    likes: async (parent, args, context) => {
      const count = await context.db('likes_comments').select('id').all('comment_id', parent.id);
      return count.length;
    }
  }
};

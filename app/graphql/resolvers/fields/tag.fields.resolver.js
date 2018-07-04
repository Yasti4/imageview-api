'use strict';

module.exports = {
  Tag: {
    posts: async (parent, args, context) => {
      const ids = await context.db('posts_tags').where('tag_id', parent.id)
        .select('post_id').map(item => item.post_id).all();
      return context.db('posts').whereIn('id', ids).all();
    }
  }
};

'use strict';

module.exports = {
  Post: {
    user: (parent, args, context) => {
      return context.db('users').first('id', parent.user_id);
    },
    album: (parent, args, context) => {
      return context.db('albums').first('id', parent.album_id);
    },
    file: (parent, args, context) => {
      return context.db('files').first('id', parent.file_id);
    },
    comments: (parent, args, context) => {
      return context.db('comments').all('post_id', parent.id);
    },
    tags: async (parent, args, context) => {
      const ids = await context.db('posts_tags').where('post_id', parent.id)
        .select('tag_id').map(item => item.tag_id).all();
      return context.db('tags').whereIn('id', ids).all();
    },
    images: (parent, args, context) => {
      return context.db('images').all('file_id', parent.file_id);
    },
    likes: async (parent, args, context) => {
      const count = await context.db('likes_posts').select('id').all('post_id', parent.id);
      return count.length;
    }
  }
};

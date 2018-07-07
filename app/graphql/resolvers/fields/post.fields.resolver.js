'use strict';

const {timestampsFieldsResolvers} = require('app/helpers');

module.exports = {
  Post: {
    ...timestampsFieldsResolvers(true),
    user: (parent, args, context) => {
      return context.actions.users.findById(parent.user_id);
    },
    album: (parent, args, context) => {
      return context.actions.albums.findById(parent.album_id);
    },
    file: (parent, args, context) => {
      return context.actions.uploads.findFileById(parent.file_id);
    },
    comments: (parent, args, context) => {
      return context.actions.comments.findAllByPostId(parent.id);
    },
    tags: async (parent, args, context) => {
      const ids = await context.db('posts_tags').where('post_id', parent.id)
        .select('tag_id').map(item => item.tag_id).all();
      return context.db('tags').whereIn('id', ids).all();
    },
    images: (parent, args, context) => {
      return context.actions.uploads.findAllImagesByFileId(parent.file_id);
    },
    likes: async (parent, args, context) => {
      const count = await context.db('likes_posts').select('id').all('post_id', parent.id);
      return count.length;
    }
  }
};

'use strict';

const {timestampsFieldsResolvers} = require('./../../../helpers');

module.exports = {
  Post: {
    ...timestampsFieldsResolvers(true),
    enableComments: (parent) => {
      return !!parent.enable_comments;
    },
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
      return context.actions.posts.tags(parent.id);
    },
    images: (parent, args, context) => {
      return context.actions.uploads.findAllImagesByFileId(parent.file_id);
    },
    likes: async (parent, args, context) => {
      return context.actions.posts.likes(parent.id);
    }
  }
};

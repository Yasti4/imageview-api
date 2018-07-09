'use strict';

const {timestampsFieldsResolvers} = require('./../../../helpers');

module.exports = {
  Album: {
    ...timestampsFieldsResolvers(true),
    posts: (parent, args, context) => {
      return context.actions.posts.findAllByAlbumId(parent.id);
    },
    subscribers: async (parent, args, context) => {
      return context.actions.albums.subscribers(parent.id);
    },
    likes: async (parent, args, context) => {
      return context.actions.albums.likes(parent.id);
    }
  }
};

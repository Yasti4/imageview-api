'use strict';

const {timestampsFieldsResolvers} = require('app/helpers');

module.exports = {
  File: {
    ...timestampsFieldsResolvers(true),
    images: (parent, args, context) => {
      return context.actions.uploads.findAllImagesByFileId(parent.id);
    },
    user: (parent, args, context) => {
      return context.actions.users.findByFileId(parent.id);
    },
    post: (parent, args, context) => {
      return context.actions.posts.findByFileId(parent.id);
    }
  }
};

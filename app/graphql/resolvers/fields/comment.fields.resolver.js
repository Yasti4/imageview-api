'use strict';

const {timestampsFieldsResolvers} = require('app/helpers');

module.exports = {
  Comment: {
    ...timestampsFieldsResolvers(true),
    user: (parent, args, context) => {
      return context.actions.users.findById(parent.user_id);
    },
    post: async (parent, args, context) => {
      return context.actions.posts.findById(parent.post_id);
    },
    likes: async (parent, args, context) => {
      return context.actions.comments.likes(parent.id);
    }
  }
};

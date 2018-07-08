'use strict';

module.exports = {
  Tag: {
    posts: async (parent, args, context) => {
      return context.actions.tags.posts(parent.id);
    }
  }
};

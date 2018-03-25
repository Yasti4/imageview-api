'use strict';

module.exports = {
  Tag: {
    posts: (parent, args, context, info) => {
      return parent.getPosts();
    }
  }
};

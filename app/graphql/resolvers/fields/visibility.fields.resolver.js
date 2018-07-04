'use strict';

module.exports = {
  Visibility: {
    albums: (parent, args, context) => {
      return context.db('albums').all('visibility', parent.name);
    },
    posts: (parent, args, context) => {
      return context.db('posts').all('visibility', parent.name);
    }
  }
};

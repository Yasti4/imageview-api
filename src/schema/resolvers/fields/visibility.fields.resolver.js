'use strict';

module.exports = {
  Visibility: {
    albums: (parent, args, context, info) => {
      return parent.getAlbums();
    },
    posts: (parent, args, context, info) => {
      return parent.getPosts();
    }
  }
};

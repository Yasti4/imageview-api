'use strict';

module.exports = {
  Visibility: {
    albums: (parent, args, context) => {
      return context.actions.albums.findAllByVisibility(parent.name);
    },
    posts: (parent, args, context) => {
      return context.actions.posts.findAllByVisibility(parent.name);
    }
  }
};

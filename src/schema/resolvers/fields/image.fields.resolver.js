'use strict';

module.exports = {
  Image: {
    user: (parent, args, context, info) => {
      return parent.getUser();
    },
    post: (parent, args, context, info) => {
      return parent.getPost();
    },
  }
};

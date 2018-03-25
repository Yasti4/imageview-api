'use strict';

module.exports = {
  Comment: {
    user: (parent, args, context, info) => {
      return parent.getUser();
    },
    post: (parent, args, context, info) => {
      return parent.getPost();
    },
    likes: (parent, args, context, info) => {
      return parent.countLikes();
    },
  }
};

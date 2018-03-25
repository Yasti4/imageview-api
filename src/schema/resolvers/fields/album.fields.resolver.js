'use strict';

module.exports = {
  Album: {
    posts: (parent, args, context, info) => {
      return parent.getPosts();
    },
    subscribers: (parent, args, context, info) => {
      return parent.getSubscribers();
    },
    likes: (parent, args, context, info) => {
      return parent.countLikes();
    },
  }
};

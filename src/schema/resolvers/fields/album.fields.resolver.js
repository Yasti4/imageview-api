'use strict';

module.exports = {
  Album: {
    posts: (parent, args, context, info) => {
      return parent.getPosts({
        attributes: context.db.Post.onlyAttributes(info)
      });
    },
    subscribers: (parent, args, context, info) => {
      return parent.getSubscribers({
        attributes: context.db.User.onlyAttributes(info)
      });
    },
    likes: (parent, args, context, info) => {
      return parent.countLikes();
    },
  }
};

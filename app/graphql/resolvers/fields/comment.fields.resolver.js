'use strict';

module.exports = {
  Comment: {
    user: (parent, args, context, info) => {
      return parent.getUser({
        attributes: context.db.User.onlyAttributes(info)
      });
    },
    post: (parent, args, context, info) => {
      return parent.getPost({
        attributes: context.db.Post.onlyAttributes(info)
      });
    },
    likes: (parent, args, context, info) => {
      return parent.countLikes();
    }
  }
};

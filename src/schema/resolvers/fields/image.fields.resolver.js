'use strict';

module.exports = {
  Image: {
    user: (parent, args, context, info) => {
      return parent.getUser({
        attributes: context.db.User.onlyAttributes(info)
      });
    },
    post: (parent, args, context, info) => {
      return parent.getPost({
        attributes: context.db.Post.onlyAttributes(info)
      });
    }
  }
};

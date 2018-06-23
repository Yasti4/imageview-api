'use strict';

module.exports = {
  File: {
    images: (parent, args, context, info) => {
      return parent.getImages({
        attributes: context.db.Image.onlyAttributes(info)
      });
    },
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

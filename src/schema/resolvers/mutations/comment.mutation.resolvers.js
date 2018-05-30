'use strict';

module.exports = {
  createComment: (parent, args, context, info) => {
    return context.db.Comment.create(args.input);
  }
};

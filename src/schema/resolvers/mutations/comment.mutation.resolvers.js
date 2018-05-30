'use strict';

module.exports = {
  createComment: (parent, args, context, info) => {
    args.input.user_id = context.userAuth.id;
    return context.db.Comment.create(args.input);
  }
};

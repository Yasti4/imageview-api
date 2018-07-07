'use strict';

module.exports = {
  comment: (parent, args, context) => {
    return context.actions.comments.findById(args.id, args.withTrashed);
  },
  comments: (parent, args, context) => {
    const repo = context.actions.comments;
    if (args.userId && args.postId) {
      return repo.findAllByUserIdAndPostId(args.userId, args.postId, args.limit, args.withTrashed);
    } else if (args.userId) {
      return repo.findAllByUserId(args.userId, args.limit, args.withTrashed);
    } else if (args.postId) {
      return repo.findAllByPostId(args.postId, args.limit, args.withTrashed);
    } else {
      return repo.findAll(args.limit, args.withTrashed);
    }
  }
};

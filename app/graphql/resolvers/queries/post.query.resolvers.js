'use strict';

module.exports = {
  post: (parent, args, context) => {
    return context.actions.posts.findById(args.id, args.withTrashed);
  },
  posts: (parent, args, context) => {
    const repo = context.actions.posts;
    if (args.userId && args.albumId) {
      return repo.findAllByUserIdAndAlbumId(args.userId, args.albumId, args.limit, args.withTrashed);
    } else if (args.userId) {
      return repo.findAllByUserId(args.userId, args.limit, args.withTrashed);
    } else if (args.postId) {
      return repo.findAllByAlbumId(args.albumId, args.limit, args.withTrashed);
    } else {
      return repo.findAll(args.limit, args.withTrashed);
    }
  },
  feed: (parent, args, context) => {
    return context.actions.posts.feed(args.page, args.limit);
  }
};

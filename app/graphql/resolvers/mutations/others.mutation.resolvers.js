'use strict';

module.exports = {
  like: (parent, args, context) => {
    const userId = context.userAuth.id;
    if (args.input.post_id) {
      return context.actions.posts.like(args.input.post_id, userId);
    } else if (args.input.album_id) {
      return context.actions.albums.like(args.input.album_id, userId);
    } else if (args.input.comment_id) {
      return context.actions.comments.like(args.input.comment_id, userId);
    } else {
      return false;
    }
  },
  follow: async (parent, args, context) => {
    if (args.input.user_follower && args.input.user_followed) {
      return context.actions.users.follow(args.input.user_follower, args.input.user_followed);
    } else if (args.input.album_id) {
      return context.actions.albums.follow(args.input.album_id, context.userAuth.id);
    } else {
      return false;
    }
  }
};

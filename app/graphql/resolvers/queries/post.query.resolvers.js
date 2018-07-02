'use strict';

module.exports = {
  post: (parent, args, context) => {
    return context.db('posts').first('id', args.id);
  },
  posts: (parent, args, context) => {
    let query = context.db('posts').limit(args.limit || 10);
    if (args.userId) {
      query = query.where('user_id', args.userId);
    }
    if (args.albumId) {
      query = query.where('album_id', args.albumId);
    }
    return query.all();
  },
  feed: (parent, args, context, info) => {
    // TODO
    return [];
  }
};

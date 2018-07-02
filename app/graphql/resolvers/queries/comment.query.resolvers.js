'use strict';

module.exports = {
  comment: (parent, args, context) => {
    return context.db('comments').first('id', args.id);
  },
  comments: (parent, args, context) => {
    let query = context.db('comments').limit(args.limit || 10);
    if (args.postId) {
      query = query.where('post_id', args.postId);
    }
    if (args.userId) {
      query = query.where('user_id', args.userId);
    }
    return query.all();
  }
};

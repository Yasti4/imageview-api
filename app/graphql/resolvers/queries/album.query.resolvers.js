'use strict';

module.exports = {
  album: (parent, args, context) => {
    return context.db('albums').first('id', args.id);
  },
  albums: (parent, args, context) => {
    const query = context.db('albums').limit(args.limit || 10);
    return args.userId ? query.all('user_id', args.userId) : query.all();
  }
};

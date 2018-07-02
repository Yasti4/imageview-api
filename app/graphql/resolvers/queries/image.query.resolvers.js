'use strict';

module.exports = {
  image: (parent, args, context) => {
    return context.db('images').first('id', args.id);
  },
  images: (parent, args, context) => {
    const query = context.db('images').limit(args.limit || 10);
    return args.fileId ? query.all('file_id', args.fileId) : query.all();
  }
};

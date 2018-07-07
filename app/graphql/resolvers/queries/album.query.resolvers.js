'use strict';

module.exports = {
  album: (parent, args, context) => {
    return context.actions.albums.findById(args.id, args.withTrashed);
  },
  albums: (parent, args, context) => {
    return args.userId
      ? context.actions.albums.findAllByUserId(args.userId, args.limit, args.withTrashed)
      : context.actions.albums.findAll(args.limit, args.withTrashed);
  }
};

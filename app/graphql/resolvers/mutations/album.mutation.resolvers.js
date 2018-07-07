'use strict';

module.exports = {
  createAlbum: async (parent, args, context) => {
    const id = await context.actions.albums.create({...args.input, user_id: context.userAuth.id});
    return context.actions.albums.findById(id);
  },
  updateAlbum: (parent, args, context) => {
    return context.isAdmin
      ? context.actions.albums.updateById(args.id, args.input, args.withTrashed)
      : context.actions.albums.updateByIdAndUserId(args.id, context.userAuth.id, args.input, args.withTrashed);
  },
  deleteAlbum: async (parent, args, context) => {
    return args.softDelete
      ? context.actions.albums.deleteById(args.id, args.softDelete)
      : context.actions.albums.deleteByIdAndUserId(args.id, context.userAuth.id, args.softDelete);
  }
};

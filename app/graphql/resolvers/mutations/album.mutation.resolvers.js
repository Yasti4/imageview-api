'use strict';

module.exports = {
  createAlbum: (parent, args, context, info) => {
    args.input.user_id = context.userAuth.id;
    return context.db.Album.create(args.input);
  },
  updateAlbum: async (parent, args, context, info) => {
    const canUpdate = context.isAdmin ? {} : { user_id: context.userAuth.id };
    const affectedRows = await context.db.Album.update(args.input, { where: { id: args.id, ...canUpdate } });
    return !!affectedRows[0];
  },
  deleteAlbum: async (parent, args, context, info) => {
    const canUpdate = context.isAdmin ? {} : { user_id: context.userAuth.id };
    const affectedRows = await context.db.Album.destroy({ where: { id: args.id, ...canUpdate } });
    return !!affectedRows;
  }
};

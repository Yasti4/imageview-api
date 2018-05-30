'use strict';

module.exports = {
  createPost: (parent, args, context, info) => {
    // TODO: tags ids - insert
    return context.db.Post.create({
      image_id: args.input.image_id,
      album_id: args.input.album_id,
      user_id: context.userAuth.id,
      description: args.input.description,
      enable_comments: args.input.enable_comments,
      visibility: args.input.visibility
    });
  },
  updatePost: async (parent, args, context, info) => {
    // TODO: tags ids - insert or remove
    const canUpdate = context.isAdmin ? {} : { user_id: context.userAuth.id };
    const affectedRows = await context.db.Post.update({
      image_id: args.input.image_id,
      album_id: args.input.album_id,
      description: args.input.description,
      enable_comments: args.input.enable_comments,
      visibility: args.input.visibility
    }, { where: { id: args.id, ...canUpdate } });
    return !!affectedRows[0];
  },
  deletePost: async (parent, args, context, info) => {
    // TODO: tags ids - remove
    const canUpdate = context.isAdmin ? {} : { user_id: context.userAuth.id };
    const affectedRows = await context.db.Post.destroy({ where: { id: args.id, ...canUpdate } });
    return !!affectedRows;
  }
};

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
  },
  like: (parent, args, context, info) => {
    const findDestroyOrCreate = async (Model, input) => {
      const instance = await Model.find({ where: input });
      if (instance) {
        return !!(await Model.destroy({ where: { id: instance.id } }));
      } else {
        return !!(await Model.create(input));
      }
    };

    if (args.input.post_id) {
      return findDestroyOrCreate(context.db.LikePost, {
        user_id: context.userAuth.id, post_id: args.input.post_id
      });
    } else if (args.input.album_id) {
      return findDestroyOrCreate(context.db.LikeAlbum, {
        user_id: context.userAuth.id, album_id: args.input.album_id
      });
    } else if (args.input.comment_id) {
      return findDestroyOrCreate(context.db.LikeComment, {
        user_id: context.userAuth.id, comment_id: args.input.comment_id
      });
    } else {
      return false;
    }
  }
};

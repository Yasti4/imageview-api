'use strict';

const {trx} = require('app/orm');

module.exports = {
  createPost: (parent, args, context) => {
    return trx(async () => {
      // Post
      const post_id = await context.actions.posts.create({
        file_id: args.input.file_id,
        album_id: args.input.album_id,
        user_id: context.userAuth.id,
        description: args.input.description,
        enable_comments: args.input.enable_comments,
        visibility: args.input.visibility
      });
      // Tags
      args.input.tags.forEach(async name => {
        const tag_id = await context.actions.tags.findOrCreate(name);
        // Posts Tags
        await context.actions.posts.addTag(post_id, tag_id);
      });
      return await context.actions.posts.findById(post_id);
    });
  },
  updatePost: async (parent, args, context) => {
    return trx(async () => {
      // Post
      const postInput = {
        image_id: args.input.image_id,
        album_id: args.input.album_id,
        description: args.input.description,
        enable_comments: args.input.enable_comments,
        visibility: args.input.visibility
      };
      const postUpdated = await (context.isAdmin
        ? context.actions.posts.updateById(args.id, postInput, args.withTrashed)
        : context.actions.posts.updateByIdAndUserId(args.id, context.userAuth.id, postInput, args.withTrashed));
      if (!postUpdated) {
        return false;
      }
      // Posts Tags
      await context.actions.posts.removeTags(args.id);
      // Tags
      args.input.tags.forEach(async name => {
        const tag_id = await context.actions.tags.findOrCreate(name);
        // Posts Tags
        await context.actions.posts.addTag(args.id, tag_id);
      });
      return true;
    });
  },
  deletePost: (parent, args, context) => {
    return args.softDelete
      ? context.actions.posts.deleteById(args.id, args.softDelete)
      : context.actions.posts.deleteByIdAndUserId(args.id, context.userAuth.id, args.softDelete);
  }
};

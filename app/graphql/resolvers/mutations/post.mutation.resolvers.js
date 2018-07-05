'use strict';

const {trx} = require('app/orm');

module.exports = {
  createPost: (parent, args, context) => {
    return trx(async (t) => {
      // Create Post
      const post = await context.db('posts', t).insert({
        image_id: args.input.image_id,
        album_id: args.input.album_id,
        user_id: context.userAuth.id,
        description: args.input.description,
        enable_comments: args.input.enable_comments,
        visibility: args.input.visibility
      });
      await args.input.tags.forEach(async name => {
        let tag = await context.db('tags').first('name', name);
        // Create Tag if not exists
        if (!tag) {
          tag = await context.db('tags', t).insert({ name });
        }
        // Sync post with tag
        await context.db('posts_tags', t).insert({ post_id: post.id, tag_id: tag.id });
      });
      return post;
    });
  },
  updatePost: async (parent, args, context) => {
    return trx(async (t) => {
      // Update Post
      let mutatePost = context.db('posts', t).where('id', args.id);
      if (!context.isAdmin) {
        mutatePost = mutatePost.where('user_id', context.userAuth.id);
      }
      const postUpdated = await mutatePost.update({
        image_id: args.input.image_id,
        album_id: args.input.album_id,
        description: args.input.description,
        enable_comments: args.input.enable_comments,
        visibility: args.input.visibility
      });
      if (!postUpdated) {
        return false;
      }
      // Unsync tags post
      await context.db('posts_tags', t).delete('post_id', args.id);
      await args.input.tags.forEach(async name => {
        let tag = await context.db('tags').first('name', name);
        // Create Tag if not exists
        if (!tag) {
          tag = await context.db('tags', t).insert({name});
        }
        // Sync post with tag
        await context.db('posts_tags', t).insert({post_id: args.id, tag_id: tag.id});
      });
      return true;
    });
  },
  deletePost: (parent, args, context) => {
    return trx(async (t) => {
      // Update Post
      let mutatePost = context.db('posts', t).where('id', args.id);
      if (!context.isAdmin) {
        mutatePost = mutatePost.where('user_id', context.userAuth.id);
      }
      const postDeleted = await mutatePost.delete();
      if (!postDeleted) {
        return false;
      }
      // Unsync tags post
      await context.db('posts_tags', t).delete('post_id', args.id);
      return true;
    });
  },
  like: (parent, args, context) => {
    const findDestroyOrCreate = async (table, key, value) => {
      const instance = await context.db(table).where('user_id', context.userAuth.id).first(key, value);
      if (instance) {
        return await context.db(table).delete('id', instance.id);
      } else {
        return !!(await context.db(table).insert({[key]: value}));
      }
    };

    if (args.input.post_id) {
      return findDestroyOrCreate('likes_posts', 'post_id', args.input.post_id);
    } else if (args.input.album_id) {
      return findDestroyOrCreate('likes_albums', 'album_id', args.input.album_id);
    } else if (args.input.comment_id) {
      return findDestroyOrCreate('likes_comments', 'comment_id', args.input.comment_id);
    } else {
      return false;
    }
  }
};

'use strict';

const {timestampsFieldsResolvers} = require('app/helpers');

module.exports = {
  User: {
    ...timestampsFieldsResolvers(true),
    image: async (parent, args, context) => {
      return context.actions.users.image(parent.file_id);
    },
    following: async (parent, args, context) => {
      return context.actions.users.following(parent.id);
    },
    followers: async (parent, args, context) => {
      return context.actions.users.followers(parent.id);
    },
    posts: (parent, args, context) => {
      return context.actions.posts.findAllByUserId(parent.id);
    },
    postsLikes: async (parent, args, context) => {
      return context.actions.users.likesPosts(parent.id);
    },
    albums: (parent, args, context) => {
      return context.actions.albums.findAllByUserId(parent.id);
    },
    albumsLikes: async (parent, args, context) => {
      return context.actions.users.likesAlbums(parent.id);
    },
    albumsSubscriptions: async (parent, args, context) => {
      return context.actions.users.subscriptionsAlbums(parent.id);
    },
    comments: (parent, args, context) => {
      return context.actions.comments.findAllByUserId(parent.id);
    },
    commentsLikes: async (parent, args, context) => {
      return context.actions.users.likesComments(parent.id);
    }
  }
};

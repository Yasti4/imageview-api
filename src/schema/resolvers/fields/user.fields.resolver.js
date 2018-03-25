'use strict';

module.exports = {
  User: {
    image: (parent, args, context, info) => {
      return parent.getImage();
    },
    following: (parent, args, context, info) => {
      return parent.getFollowing();
    },
    followers: (parent, args, context, info) => {
      return parent.getFollowers();
    },
    posts: (parent, args, context, info) => {
      return parent.getPosts();
    },
    postsLikes: (parent, args, context, info) => {
      return parent.getPostsLikes();
    },
    albums: (parent, args, context, info) => {
      return parent.getAlbums();
    },
    albumsLikes: (parent, args, context, info) => {
      return parent.getAlbumsLikes();
    },
    albumsSubscriptions: (parent, args, context, info) => {
      return parent.getAlbumsSubscriptions();
    },
    comments: (parent, args, context, info) => {
      return parent.getComments();
    },
    commentsLikes: (parent, args, context, info) => {
      return parent.getCommentsLikes();
    },
  }
};

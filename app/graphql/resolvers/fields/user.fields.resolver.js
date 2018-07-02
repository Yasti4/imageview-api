'use strict';

module.exports = {
  User: {
    image: async (parent, args, context, info) => {
      const file = await parent.getFile();
      return context.db.Image.find({
        where: { file_id: file.id }
      });
    },
    following: (parent, args, context, info) => {
      return parent.getFollowing({
        attributes: context.db.User.onlyAttributes(info)
      });
    },
    followers: (parent, args, context, info) => {
      return parent.getFollowers({
        attributes: context.db.User.onlyAttributes(info)
      });
    },
    posts: (parent, args, context, info) => {
      return parent.getPosts({
        attributes: context.db.Post.onlyAttributes(info)
      });
    },
    postsLikes: (parent, args, context, info) => {
      return parent.getPostsLikes({
        attributes: context.db.Post.onlyAttributes(info)
      });
    },
    albums: (parent, args, context, info) => {
      return parent.getAlbums({
        attributes: context.db.Album.onlyAttributes(info)
      });
    },
    albumsLikes: (parent, args, context, info) => {
      return parent.getAlbumsLikes({
        attributes: context.db.Album.onlyAttributes(info)
      });
    },
    albumsSubscriptions: (parent, args, context, info) => {
      return parent.getAlbumsSubscriptions({
        attributes: context.db.Album.onlyAttributes(info)
      });
    },
    comments: (parent, args, context, info) => {
      return parent.getComments({
        attributes: context.db.Comment.onlyAttributes(info)
      });
    },
    commentsLikes: (parent, args, context, info) => {
      return parent.getCommentsLikes({
        attributes: context.db.Comment.onlyAttributes(info)
      });
    }
  }
};

'use strict';

module.exports = {
  Post: {
    user: (parent, args, context, info) => {
      return parent.getUser({
        attributes: context.db.User.onlyAttributes(info)
      });
    },
    album: (parent, args, context, info) => {
      return parent.getAlbum({
        attributes: context.db.Album.onlyAttributes(info)
      });
    },
    file: (parent, args, context, info) => {
      return parent.getFile({
        attributes: context.db.File.onlyAttributes(info)
      });
    },
    comments: (parent, args, context, info) => {
      return parent.getComments({
        attributes: context.db.Comment.onlyAttributes(info)
      });
    },
    tags: (parent, args, context, info) => {
      return parent.getTags({
        attributes: context.db.Tag.onlyAttributes(info)
      });
    },
    images: async (parent, args, context, info) => {
      const file = await parent.getFile();
      return file.getImages({
        attributes: context.db.Image.onlyAttributes(info)
      });
    },
    likes: (parent, args, context, info) => {
      return parent.countLikes();
    }
  }
};

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
    image: (parent, args, context, info) => {
      return parent.getImage({
        attributes: context.db.Image.onlyAttributes(info)
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
    likes: (parent, args, context, info) => {
      return parent.countLikes();
    },
  }
};

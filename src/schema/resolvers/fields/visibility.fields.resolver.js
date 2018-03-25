'use strict';

module.exports = {
  Visibility: {
    albums: (parent, args, context, info) => {
      return parent.getAlbums({
        attributes: context.db.Album.onlyAttributes(info)
      });
    },
    posts: (parent, args, context, info) => {
      return parent.getPosts({
        attributes: context.db.Post.onlyAttributes(info)
      });
    }
  }
};

'use strict';

module.exports = {
  post: (parent, args, context, info) => {
    if (args.id) {
      return context.db.Post.find({
        where: {
          'id': args.id
        }
      });
    } else if (args.user_id) {
      return context.db.Post.find({
        where: {
          'user_id': args.user_id
        }
      });
    } else if (args.album_id) {
      return context.db.Post.find({
        where: {
          'album_id': args.album_id
        }
      });
    } else if (args.enable_comments) {
      return context.db.Post.find({
        where: {
          'enable_comments': args.enable_comments
        }
      });
    }
  },
  posts: (parent, args, context, info) => {
    return context.db.Post.findAll();
  },
  user: (parent, args, context, info) => {
    return context.db.User.find({
      where: {
        'id': args.id
      }
    });
  },
  album: (parent, args, context, info) => {
    return parent.album || context.db.Album.find({
      where: {
        id: args.id
      }
    });
  },
  image: (parent, args, context, info) => {
    return context.db.Image.find({
      where: {
        id: parent.image_id || args.id
      }
    });
  },
};

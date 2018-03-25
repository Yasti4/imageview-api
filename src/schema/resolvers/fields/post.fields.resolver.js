'use strict';

module.exports = {
  Post: {
    user: (parent, args, context, info) => {
      return parent.getUser();
    },
    album: (parent, args, context, info) => {
      return parent.getAlbum();
    },
    image: (parent, args, context, info) => {
      return parent.getImage();
    },
    comments: (parent, args, context, info) => {
      return parent.getComments();
    },
    tags: (parent, args, context, info) => {
      return parent.getTags();
    },
    likes: (parent, args, context, info) => {
      return parent.countLikes();
    },
  }
};

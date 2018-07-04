'use strict';

module.exports = {
  ...require('./album.fields.resolver'),
  ...require('./comment.fields.resolver'),
  ...require('./file.fields.resolver'),
  ...require('./image.fields.resolver'),
  ...require('./post.fields.resolver'),
  ...require('./privacity.fields.resolver'),
  ...require('./role.fields.resolver'),
  ...require('./tag.fields.resolver'),
  ...require('./user.fields.resolver'),
  ...require('./visibility.fields.resolver'),
  SearchResult: {
    __resolveType(obj) {
      return obj.username ? 'User' : 'Tag';
    }
  },
  Timestamps: {
    __resolveType(obj) {
      if (obj.username) {
        return 'User';
      } else if (obj.enableComments) {
        return 'Post';
      } else if (obj.filename) {
        return 'File';
      } else if (obj.content) {
        return 'Comment';
      } else if (obj.description) {
        return 'Album';
      } else {
        return null;
      }
    }
  }
};

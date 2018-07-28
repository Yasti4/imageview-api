'use strict';

module.exports = {
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

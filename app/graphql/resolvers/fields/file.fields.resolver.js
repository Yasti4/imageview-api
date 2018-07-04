'use strict';

module.exports = {
  File: {
    images: (parent, args, context) => {
      return context.db('images').all('file_id', parent.id);
    },
    user: (parent, args, context) => {
      return context.db('users').first('file_id', parent.id);
    },
    post: (parent, args, context) => {
      return context.db('posts').first('file_id', parent.id);
    }
  }
};

'use strict';

module.exports = {
  ...require('./privacity.mutation.resolvers'),
  ...require('./role.mutation.resolvers'),
  ...require('./upload.mutation.resolvers'),
  ...require('./user.mutation.resolvers'),
  ...require('./comment.mutation.resolvers'),
  ...require('./album.mutation.resolvers'),
  ...require('./post.mutation.resolvers')
};

'use strict';

module.exports = Object.assign({},
  require('./album.mutation.resolvers'),
  require('./comment.mutation.resolvers'),
  require('./others.mutation.resolvers'),
  require('./post.mutation.resolvers'),
  require('./upload.mutation.resolvers'),
  require('./user.mutation.resolvers')
);

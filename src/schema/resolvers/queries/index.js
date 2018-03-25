'use strict';

module.exports = {
  ...require('./album.resolvers'),
  ...require('./comment.resolvers'),
  ...require('./image.resolvers'),
  ...require('./post.resolvers'),
  ...require('./privacity.resolvers'),
  ...require('./role.resolvers'),
  ...require('./tag.resolvers'),
  ...require('./user.resolvers'),
  ...require('./visibility.resolvers'),
};
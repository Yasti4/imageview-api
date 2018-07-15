'use strict';

module.exports = Object.assign({},
  require('./album.query.resolvers'),
  require('./comment.query.resolvers'),
  require('./email.query.resolvers'),
  require('./image.query.resolvers'),
  require('./post.query.resolvers'),
  require('./privacity.query.resolvers'),
  require('./role.query.resolvers'),
  require('./tag.query.resolvers'),
  require('./user.query.resolvers'),
  require('./visibility.query.resolvers')
);

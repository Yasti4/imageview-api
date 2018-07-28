'use strict';

module.exports = Object.assign({},
  require('./album.fields.resolver'),
  require('./comment.fields.resolver'),
  require('./file.fields.resolver'),
  require('./image.fields.resolver'),
  require('./post.fields.resolver'),
  require('./privacity.fields.resolver'),
  require('./role.fields.resolver'),
  require('./tag.fields.resolver'),
  require('./user.fields.resolver'),
  require('./visibility.fields.resolver'),
  require('./others.fields.resolver')
);

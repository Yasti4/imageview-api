'use strict';

module.exports = {
  ...require('./album.fields.resolver'),
  ...require('./comment.fields.resolver'),
  ...require('./image.fields.resolver'),
  ...require('./post.fields.resolver'),
  ...require('./privacity.fields.resolver'),
  ...require('./role.fields.resolver'),
  ...require('./tag.fields.resolver'),
  ...require('./user.fields.resolver'),
  ...require('./visibility.fields.resolver')
};

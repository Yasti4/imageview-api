'use strict';

module.exports = {
  ...require('./album.fields.resolver'),
  ...require('./comment.fields.resolver'),
  ...require('./image.fields.resolver'),
  ...require('./post.fields.resolver')
};
'use strict';

module.exports = {
  ...require('./privacity.mutations.resolvers'),
  ...require('./role.mutations.resolvers'),
  ...require('./upload.mutations.resolvers'),
  ...require('./user.mutation.resolvers'),
  ...require('./comment.mutation.resolvers')
};

'use strict';

module.exports = `type Mutation {
  ${require('./privacity.mutations')}
  ${require('./role.mutations')}
  ${require('./upload.mutations')}
  ${require('./user.mutations')}
  ${require('./visibility.mutations')}
}`;

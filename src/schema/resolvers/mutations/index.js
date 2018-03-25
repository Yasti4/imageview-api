'use strict';

module.exports = {
    ...require('./user.mutation.resolvers'),
    ...require('./privacity.mutations.resolvers'),
    ...require('./role.mutations.resolvers'),
};
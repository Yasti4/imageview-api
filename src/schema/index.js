'use strict';

const {
  makeExecutableSchema
} = require('graphql-tools');

module.exports = makeExecutableSchema({
  typeDefs: `
    ${require('./types')}
    ${require('./queries')}
  `,
  resolvers: {
    Query: require('./resolvers/queries'),
    ...require('./resolvers/fields')
  }
});

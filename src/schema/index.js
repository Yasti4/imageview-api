'use strict';

const {
  makeExecutableSchema
} = require('graphql-tools');

module.exports = makeExecutableSchema({
  typeDefs: `
    scalar Date
    ${require('./types')}
    ${require('./queries')}
  `,
  resolvers: {
    Query: require('./resolvers/queries'),
    Date: require('graphql-date'),
    ...require('./resolvers/fields')
  }
});

'use strict';

const {
  makeExecutableSchema
} = require('graphql-tools');

const schema = makeExecutableSchema({
  typeDefs: `
    ${require('./types')}
    ${require('./queries')}
  `,
  resolvers: {
    Query: require('./resolvers/queries')
  }
});

module.exports = schema;

'use strict';

const {
  makeExecutableSchema
} = require('graphql-tools');

module.exports = makeExecutableSchema({
  typeDefs: `
    # ${require('./typedefs/directives')}
    ${require('./typedefs/scalars')}
    ${require('./typedefs/unions')}
    ${require('./typedefs/types')}
    ${require('./typedefs/inputs')}
    ${require('./typedefs/queries')}
    ${require('./typedefs/mutations')}
  `,
  resolvers: {
    ...require('./resolvers/scalars'),
    ...require('./resolvers/fields'),
    Query: require('./resolvers/queries'),
    Mutation: require('./resolvers/mutations')
  },
  schemaDirectives: {
    // ...require('./resolvers/directives')
  }
});

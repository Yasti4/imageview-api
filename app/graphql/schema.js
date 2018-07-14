const {makeExecutableSchema, addMockFunctionsToSchema} = require('graphql-tools');
const mocks = require('./mocks');

module.exports = function (showMockData) {
  showMockData = showMockData || false;

  const schema = makeExecutableSchema({
    typeDefs: `
      # ${require('./typedefs/directives')}
      ${require('./typedefs/interfaces')}
      ${require('./typedefs/scalars')}
      ${require('./typedefs/unions')}
      ${require('./typedefs/types')}
      ${require('./typedefs/inputs')}
      ${require('./typedefs/queries')}
      ${require('./typedefs/mutations')}
    `,
    resolvers: showMockData ? {} : Object.assign({},
      require('./resolvers/scalars'),
      require('./resolvers/fields'),
      {Query: require('./resolvers/queries')},
      {Mutation: require('./resolvers/mutations')}
    ),
    resolverValidationOptions: showMockData ? {
      requireResolversForResolveType: false
    } : {},
    schemaDirectives: {
      // ...require('./resolvers/directives')
    }
  });

  if (showMockData) {
    addMockFunctionsToSchema({
      schema,
      mocks,
      preserveResolvers: true
    });
  }

  return schema;
};
const mocks = require('./mocks');
const actions = require('./../actions');

module.exports = function (showMockData) {
  showMockData = showMockData || false;
  return {
    typeDefs: `
      ${require('./typedefs/directives')}
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
    schemaDirectives: require('./resolvers/directives'),
    context: ({req}) => ({
      actions,
      isAdmin: req.isAuth ? req.userAuth.role === 'admin' : false,
      isUser: req.isAuth ? req.userAuth.role === 'user' : false,
      isAuth: req.isAuth,
      userAuth: req.userAuth
    }),
    mocks: showMockData ? mocks : false,
    playground: showMockData ? {} : {settings: {'editor.theme': 'light'}}
  };
};

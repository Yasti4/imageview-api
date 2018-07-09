const app = module.exports = require('express')();
const {graphiqlExpress, graphqlExpress} = require('apollo-server-express');
const {apolloUploadExpress} = require('apollo-upload-server');
const {makeExecutableSchema}= require('graphql-tools');
const actions = require('./../actions');
const {isDevelopment} = require('./../util');
const authMiddleware = require('./../middlewares/auth');

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

app.use('/api', authMiddleware, apolloUploadExpress(), graphqlExpress(req => {
  return {
    schema,
    context: {
      actions,
      isAdmin: req.isAuth ? req.userAuth.role === 'admin' : false,
      isAuth: req.isAuth,
      userAuth: req.userAuth
    },
    cacheControl: {
      defaultMaxAge: +process.env.APP_CACHE_SECONDS
    }
  };
}));

if (isDevelopment) {
  app.use('/graphiql', graphiqlExpress({endpointURL: '/api', schema: schema}));
}

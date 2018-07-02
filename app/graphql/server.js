const app = module.exports = require('express')();
const {graphiqlExpress, graphqlExpress} = require('apollo-server-express');
const {apolloUploadExpress} = require('apollo-upload-server');
const {makeExecutableSchema}= require('graphql-tools');
const jwt = require('jwt-simple');
const {unixTimestamp} = require('app/util');
const {table} = require('app/orm');

const isAuthMiddleware = (req, res, next) => {
  req.isAuth = false;
  req.userAuth = null;
  try {
    const authorization = req.headers.Authorization || req.headers.authorization || req.query.token || '';
    const token = authorization.split(' ')[1] /* HEADERS */ || authorization; /* GET */
    const payload = jwt.decode(token, process.env.APP_KEY);
    if (payload.exp > unixTimestamp()) {
      req.isAuth = true;
      req.userAuth = payload.sub;
    }
  } catch (err) {}
  next();
};

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

app.use('/api', isAuthMiddleware, apolloUploadExpress(), graphqlExpress(req => {
  return {
    schema,
    context: {
      db: table,
      isAdmin: req.isAuth ? req.userAuth.role === 'admin' : false,
      isAuth: req.isAuth,
      userAuth: req.userAuth
    },
    cacheControl: {
      defaultMaxAge: process.env.APP_CACHE_SECONDS || 1800
    }
  };
}));

const isDevelopment = process.env.NODE_ENV !== 'production';

if (isDevelopment) {
  app.use('/graphiql', graphiqlExpress({endpointURL: '/api', schema: schema}));
}

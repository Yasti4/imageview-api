const app = module.exports = require('express')();
const {graphiqlExpress, graphqlExpress} = require('apollo-server-express');
const {apolloUploadExpress} = require('apollo-upload-server');
const actions = require('./../actions');
const {isDevelopment, isTesting} = require('./../util');
const authMiddleware = require('./../middlewares/auth');
const schema = require('./schema')(isTesting);

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

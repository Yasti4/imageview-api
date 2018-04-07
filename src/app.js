'use strict';

const Ouch = require('ouch');
const dotenv = require('dotenv');
const express = require('express');
const compression = require('compression');
const bodyParser = require('body-parser');
const {
  graphqlExpress,
  graphiqlExpress
} = require('apollo-server-express');
const jwt = require('jwt-simple');
const {
  unixTimestamp
} = require('./helpers');

class App {

  constructor(fn) {
    dotenv.load();
    this.isDevelopment = process.env.NODE_ENV === 'development';
    this.db = require('./models');
    this.isAuthMiddleware = (req, res, next) => {
      req.isAuth = false;
      req.userAuth = null;
      try {
        const authorization = req.headers.Authorization || req.query.token || null;
        const token = authorization.split(' ')[1] /* HEADERS */ || authorization /* GET */ ;
        const payload = jwt.decode(token, process.env.APP_KEY);
        if (payload.exp > unixTimestamp()) {
          req.isAuth = true;
          req.userAuth = payload.sub;
        }
      } catch (err) {}
      next();
    };
    this.app = express();
    this.config();
    this.run(fn);
  }

  config() {
    this.app.use(compression());
    this.app.use('/api', bodyParser.json(), this.isAuthMiddleware, graphqlExpress(req => ({
      schema: require('./schema'),
      context: {
        db: this.db,
        isAuth: req.isAuth,
        userAuth: req.userAuth
      },
      debug: this.isDevelopment,
      cacheControl: {
        defaultMaxAge: process.env.APP_CACHE_SECONDS || 1800
      },
    })));
    if (this.isDevelopment) {
      this.app.use('/graphiql', graphiqlExpress({
        endpointURL: '/api'
      }));
    }
  }

  run(fn) {
    if (this.isDevelopment) {
      this.app.get('/', (req, res) => {
        res.redirect(`/graphiql?token=${process.env.DEVELOPMENT_ADMIN_BEARER_TOKEN}`);
      });
      this.app.use((err, req, res, next) => {
        new Ouch([new Ouch.handlers.PrettyPageHandler()]).handleException(err, req, res);
      });
    }
    this.app.listen(process.env.APP_PORT, (err) => {
      if (err) throw err;
      if (this.isDevelopment) {
        const baseURL = `${process.env.APP_URL}:${process.env.APP_PORT}`;
        console.group(`\x1Bc'ImageView`);
        console.log(`\nRunning at ${baseURL}\nAPI: ${baseURL}/api\nDEV API: ${baseURL}/graphiql\n`);
        console.groupEnd();
        fn && fn();
      }
    });
  }

}

module.exports = new App(() => {
  // callback
}).app;

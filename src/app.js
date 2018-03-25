'use strict';

const dotenv = require('dotenv');
const express = require('express');
const compression = require('compression');
const bodyParser = require('body-parser');
const {
  graphqlExpress,
  graphiqlExpress
} = require('apollo-server-express');

class App {

  constructor(fn) {
    dotenv.load();
    this.isDevelopment = process.env.NODE_ENV === 'development';
    this.app = express();
    this.config();
    this.run(fn);
  }

  config() {
    this.app.use(compression());
    this.app.use('/graphql', bodyParser.json(), graphqlExpress({
      schema: require('./schema'),
      context: {
        db: require('./models')
      },
      debug: this.isDevelopment,
      tracing: this.isDevelopment,
      cacheControl: true
    }));
    if (this.isDevelopment) {
      this.app.use('/graphiql', graphiqlExpress({
        endpointURL: '/graphql'
      }));
    }
  }

  run(fn) {
    this.app.listen(process.env.APP_PORT, (err) => {
      if (err) throw err;
      console.log('\x1Bc');
      console.log(`Running at ${process.env.APP_URL}:${process.env.APP_PORT}`);
      fn && fn();
    });
  }

}

module.exports = new App(() => {
  console.log();
}).app;

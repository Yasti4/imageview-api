'use strict';

const dotenv = require('dotenv');
const express = require('express');
const compression = require('compression');
const bodyParser = require('body-parser');
// const {
//     buildSchema
// } = require('graphql');
const {
  graphqlExpress,
  graphiqlExpress
} = require('apollo-server-express');

class App {

  constructor(fn) {
    dotenv.load();
    this.isDev = process.env.NODE_ENV === 'development';
    this.app = express();
    this.config();
    this.run(fn);
  }

  config() {
    this.app.use(compression());
    this.app.use('/graphql', bodyParser.json(), graphqlExpress(request => ({
      schema: require('./schema'),
      context: {
        db: require('./config/knex'),
        headers: request.headers
      },
      debug: this.isDev,
      tracing: true,
      cacheControl: true
    })));
    if (this.isDev) {
      this.app.use('/graphiql', graphiqlExpress({
        endpointURL: '/graphql'
      }));
    }
  }

  run(fn) {
    this.app.listen(process.env.APP_PORT, (err) => {
      if (err) throw err;
      console.log(`Running at ${process.env.APP_URL}:${process.env.APP_PORT}`);
      fn && fn();
    });
  }

}

module.exports = new App(async () => {
  /* Start Callback */
  // const User = require('./models/user');
  // const user = await User.where('id', 1).with('posts').first();
  // console.log(user ? user.toJSON() : '...User not found...');
  /* End Callback */
}).app;

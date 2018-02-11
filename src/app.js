'use strict';

class App {
  constructor(fn) {
    this.app = require('express')();
    this.server = null;
    this.config();
    this.routes();
    this.run(fn);
  }
  config() {
    require('dotenv').load();
    const bodyParser = require('body-parser');
    this.app.use(bodyParser.json({
      type: 'application/json'
    }));
    this.app.use(bodyParser.urlencoded({
      extended: false
    }));
    this.app.use((req, res, next) => {
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Access-Control-Allow-Headers', 'Accept,Content-Type,Authorization');
      res.setHeader('Access-Control-Allow-Methods', '*');
      next();
    });
  }
  routes() {
    this.app.use('/graphql', require('express-graphql')({
      schema: require('./schema'),
      graphiql: process.env.NODE_ENV === 'development'
    }));
  }
  logs() {
    if (this.server !== null) {
      ['SIGINT', 'SIGTERM', 'unhandledRejection'].forEach(event => {
        process.on(event, (err) => {
          if (err) {
            console.error(`[ImageView server]: ${err}`);
            process.exit(1);
          }
          this.server.close(() => {
            console.log('[ImageView server]: Closed.');
            process.exit(0);
          });
        })
      });
    }
  }
  run(fn) {
    if (this.server === null) {
      this.server = this.app.listen(process.env.APP_PORT, (err) => {
        this.logs();
        if (err) {
          throw new Error(err);
        } else {
          console.log(`[ImageView server]: Running at ${process.env.APP_URL}:${process.env.APP_PORT} with PID ${process.pid}.`);
          if (fn) {
            fn();
          }
        }
      });
    }
  }
}

module.exports = new App(async () => {
  // Callback
  const User = require('./models/user');
  const user = await User.where('id', 191).with('posts').first();
  console.log(user ? user.toJSON() : '...User not found...');
  // End Callback
}).app;
'use strict';

const jwt = require('jwt-simple');

module.exports = {
  user: (parent, args, context) => {
    let query = context.db('users');
    if (args.id) {
      return query.first('id', args.id);
    } else if (args.username) {
      return query.first('username', args.username);
    } else if (args.email) {
      return query.first('email', args.email);
    } else {
      return null;
    }
  },
  users: (parent, args, context) => {
    return context.db('users').limit(args.limit || 10).all();
  },
  me: (parent, args, context) => {
    if (context.userAuth) {
      return context.userAuth;
    }
    const payload = jwt.decode(args.token, process.env.APP_KEY);
    return payload ? payload.sub : null;
  }
};

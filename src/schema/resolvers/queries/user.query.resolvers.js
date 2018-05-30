'use strict';

const jwt = require('jwt-simple');

module.exports = {
  user: (parent, args, context, info) => {
    return context.db.User.find({
      where: {
        ...args.id ? { id: args.id } : {},
        ...args.username ? { username: args.username } : {},
        ...args.email ? { email: args.email } : {}
      }
    });
  },
  users: (parent, args, context, info) => {
    return context.db.User.findAll({
      limit: args.limit || 10
    });
  },
  me: (parent, args, context, info) => {
    if (context.userAuth) {
      return context.userAuth;
    }
    const payload = jwt.decode(args.token, process.env.APP_KEY);
    return payload ? payload.sub : null;
  }
};

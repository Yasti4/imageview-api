'use strict';

const jwt = require('jwt-simple');
const { unixTimestamp } = require('./../../../helpers');

module.exports = {
  signIn: (parent, args, context, info) => {
    return context.db.User.find({
      raw: true,
      where: {
        email: args.email,
        password: args.password
      }
    }).then(user => {
      const now = new Date();
      now.setDate(now.getDate() + 14);
      return user ? {
        tokenType: 'Bearer',
        expiresIn: unixTimestamp(now),
        accessToken: jwt.encode({
          sub: user,
          iat: unixTimestamp(),
          exp: unixTimestamp(now),
        }, process.env.APP_KEY)
      } : null;
    });
  },
  createUser: (parent, args, context, info) => {
    args.input.image_id = 1;
    return context.db.User.create(args.input);
  },
  updateUser: (parent, args, context, info) => {
    return context.db.User.update(
      args.input, {
        where: {
          username: args.username
        }
      }
    )
  }
};

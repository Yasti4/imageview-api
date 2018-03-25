'use strict';

const jwt = require('jwt-simple');
const moment = require('moment');

module.exports = {
  signIn: (parent, args, context, info) => {
    return context.db.User.find({
      raw: true,
      where: {
        email: args.email,
        password: args.password
      }
    }).then(user => {
      return user ? {
        tokenType: 'Bearer',
        expiresIn: moment().add(14, 'days').unix(),
        accessToken: jwt.encode({
          sub: user,
          iat: moment().unix(),
          exp: moment().add(14, 'days').unix(),
        }, process.env.APP_KEY)
      } : null;
    });
  },
  createUser: (parent, args, context, info) => {
    args.input.image_id = 1;
    return context.db.User.create(args.input);
  },
  updateUser: (parent, args, context, info) => {
    console.log(args);
    return context.db.User.update(
      args.input, {
        where: {
          username: args.username
        }
      }
    )
  }
};

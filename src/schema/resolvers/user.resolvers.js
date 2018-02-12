'use strict';

const User = require('./../../models/user');

module.exports = {
  user: async (parent, args, context, info) => {
    const user = await User.where('username', args.username).first();
    return user ? user.toJSON() : null;
  },
  users: async (parent, args, context, info) => {
    return (await User.get()).toJSON();
  }
};

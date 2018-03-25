'use strict';

module.exports = {
  user: (parent, args, context, info) => {
    return context.db.User.find({
      where: {
        ...args.id ? {
          id: args.id
        } : {},
        ...args.username ? {
          username: args.username
        } : {},
        ...args.email ? {
          email: args.email
        } : {},
      }
    });
  },
  users: (parent, args, context, info) => {
    return context.db.User.findAll({
      limit: args.limit || 10
    });
  }
};

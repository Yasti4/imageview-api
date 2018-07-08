'use strict';

module.exports = {
  user: (parent, args, context) => {
    const repo = context.actions.users;
    if (args.id) {
      return repo.findById(args.id, args.withTrashed);
    } else if (args.username) {
      return repo.findByUsername(args.username, args.withTrashed);
    } else if (args.email) {
      return repo.findByEmail(args.email, args.withTrashed);
    } else {
      return null;
    }
  },
  users: (parent, args, context) => {
    return context.actions.users.findAll(args.limit, args.withTrashed);
  },
  me: (parent, args, context) => {
    return context.userAuth || context.actions.users.me(args.token);
  }
};

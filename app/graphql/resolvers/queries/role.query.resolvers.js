'use strict';

module.exports = {
  role: (parent, args, context) => {
    return context.actions.roles.find(args.name);
  },
  roles: (parent, args, context) => {
    return context.actions.roles.findAll();
  }
};

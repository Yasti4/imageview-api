'use strict';

module.exports = {
  privacity: (parent, args, context) => {
    return context.actions.users.privacity(args.userId);
  },
  privacities: (parent, args, context) => {
    return context.actions.privacities.findAll();
  }
};

'use strict';

module.exports = {
  role: (parent, args, context, info) => {
    return context.db.Role.find({
      where: {
        name: args.name
      }
    });
  },
  roles: (parent, args, context, info) => {
    return context.db.Role.findAll();
  }
};

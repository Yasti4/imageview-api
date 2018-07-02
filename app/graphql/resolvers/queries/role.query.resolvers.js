'use strict';

module.exports = {
  role: (parent, args, context) => {
    return context.db('roles').first('name', args.name);
  },
  roles: (parent, args, context) => {
    return context.db('roles').all();
  }
};

'use strict';

module.exports = {
  Role: {
    users: (parent, args, context) => {
      return context.db('users').all('role', parent.name);
    }
  }
};

'use strict';

module.exports = {
  Role: {
    users: (parent, args, context) => {
      return context.actions.users.findAllByRole(parent.name);
    }
  }
};

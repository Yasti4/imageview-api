'use strict';

module.exports = {
  Privacity: {
    user: (parent, args, context) => {
      return context.actions.users.findById(parent.user_id);
    }
  }
};

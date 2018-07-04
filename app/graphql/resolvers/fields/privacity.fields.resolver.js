'use strict';

module.exports = {
  Privacity: {
    user: (parent, args, context) => {
      return context.db('users').first('id', parent.user_id);
    }
  }
};

'use strict';

module.exports = {
  Privacity: {
    user: (parent, args, context, info) => {
      return parent.getUser({
        attributes: context.db.User.onlyAttributes(info)
      });
    }
  }
};

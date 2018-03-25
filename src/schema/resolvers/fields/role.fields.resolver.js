'use strict';

module.exports = {
  Role: {
    users: (parent, args, context, info) => {
      return parent.getUsers({
        attributes: context.db.User.onlyAttributes(info)
      });
    }
  }
};

'use strict';

module.exports = {
  privacity: (parent, args, context, info) => {
    return context.db.Privacity.find({
      where: {
        user_id: args.userId
      }
    });
  }
};

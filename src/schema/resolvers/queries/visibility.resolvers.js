'use strict';

module.exports = {
  visibility: (parent, args, context, info) => {
    return context.db.Visibility.find({
      where: {
        name: args.name
      }
    });
  },
  visibilities: (parent, args, context, info) => {
    return context.db.Visibility.findAll();
  }
};

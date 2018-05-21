'use strict';

module.exports = {
  image: (parent, args, context, info) => {
    return context.db.Image.find({
      where: { id: args.id }
    });
  },
  images: (parent, args, context, info) => {
    return context.db.Image.findAll({
      limit: args.limit || 10
    });
  }
};

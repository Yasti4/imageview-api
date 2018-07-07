'use strict';

module.exports = {
  visibility: (parent, args, context) => {
    return context.actions.visibilites.find(args.name);
  },
  visibilities: (parent, args, context) => {
    return context.actions.visibilites.findAll();
  }
};

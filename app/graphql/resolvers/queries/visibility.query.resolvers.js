'use strict';

module.exports = {
  visibility: (parent, args, context) => {
    return context.actions.visibilities.find(args.name);
  },
  visibilities: (parent, args, context) => {
    return context.actions.visibilities.findAll();
  }
};

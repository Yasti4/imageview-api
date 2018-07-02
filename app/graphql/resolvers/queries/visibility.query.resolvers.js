'use strict';

module.exports = {
  visibility: (parent, args, context) => {
    return context.db('visibilites').first('name', args.name);
  },
  visibilities: (parent, args, context) => {
    return context.db('visibilites').all();
  }
};

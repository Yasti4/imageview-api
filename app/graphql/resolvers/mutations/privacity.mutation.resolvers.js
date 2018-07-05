'use strict';

module.exports = {
  createPrivacity: (parent, args, context) => {
    return context.db('privacities').insert(args.input);
  },
  updatePrivacity: async (parent, args, context) => {
    return context.db('privacities').where('user_id', args.input.user_id).update(args.input);
  }
};

'use strict';

module.exports = {
  createComment: (parent, args, context) => {
    return context.db('comments').insert({...args.input, user_id: context.userAuth.id});
  },
  updateComment: async (parent, args, context) => {
    let mutate = context.db('comments').where('id', args.id);
    if (!context.isAdmin) {
      mutate = mutate.where('user_id', context.userAuth.id);
    }
    return mutate.update({comment: args.comment});
  }
};

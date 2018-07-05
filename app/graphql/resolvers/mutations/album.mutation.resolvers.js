'use strict';

module.exports = {
  createAlbum: (parent, args, context) => {
    return context.db('albums').insert({...args.input, user_id: context.userAuth.id});
  },
  updateAlbum: async (parent, args, context) => {
    let mutate = context.db('albums').where('id', args.id);
    if (!context.isAdmin) {
      mutate = mutate.where('user_id', context.userAuth.id);
    }
    return mutate.update(args.input);
  },
  deleteAlbum: async (parent, args, context) => {
    let mutate = context.db('albums').where('id', args.id);
    if (!context.isAdmin) {
      mutate = mutate.where('user_id', context.userAuth.id);
    }
    return mutate.delete();
  }
};

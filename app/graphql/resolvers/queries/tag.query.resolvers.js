'use strict';

const {shuffle} = require('app/util');

module.exports = {
  tag: (parent, args, context) => {
    return context.db('tags').first('name', args.name);
  },
  tags: (parent, args, context) => {
    let query = context.db('tags').limit(args.limit || 10);
    if (args.postId) {
      query = query.posts().join().where('posts.id', args.postId);
    }
    return query.all();
  },
  search: async (parent, args, context) => {
    const users = await context.db('users')
      .whereRaw('username like ?', [`%${args.search}%`])
      .forPage(args.page, args.limit)
      .all();
    const tags = await context.db('tags')
      .whereRaw('name like ?', [`%${args.search}%`])
      .forPage(args.page, args.limit)
      .all();
    return shuffle([...users, ...tags]);
  }
};

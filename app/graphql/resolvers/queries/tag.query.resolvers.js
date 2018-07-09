'use strict';

const {shuffle} = require('./../../../util');

module.exports = {
  tag: (parent, args, context) => {
    return context.actions.tags.findByName(args.name);
  },
  tags: (parent, args, context) => {
    return args.postId
      ? context.actions.tags.findAllByPostId(args.postId, args.limit)
      : context.actions.tags.findAll(args.limit);
  },
  search: async (parent, args, context) => {
    const users = await context.actions.users.searchByUserName(args.search, args.page, args.limit);
    const tags = await context.actions.tags.searchByName(args.search, args.page, args.limit);
    return shuffle([...users, ...tags]);
  }
};

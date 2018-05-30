'use strict';

module.exports = {
  tag: (parent, args, context, info) => {
    return context.db.Tag.find({
      where: {
        name: args.name
      }
    });
  },
  tags: (parent, args, context, info) => {
    return context.db.Tag.findAll({
      ...args.postId ? {
        include: [{
          model: context.db.Post,
          as: 'posts',
          where: {
            id: args.postId
          }
        }]
      } : {},
      limit: args.limit || 10
    });
  }
  // search: async (parent, args, context, info) => {
  //   const users = await context.db.User.findAll({
  //     where: {
  //       username: {
  //         [context.db.Sequelize.Op.like]: `%${args.search}%`
  //       }
  //     }
  //   });
  //   const tags = await context.db.Tag.findAll({
  //     where: {
  //       name: {
  //         [context.db.Sequelize.Op.like]: `%${args.search}%`
  //       }
  //     }
  //   });
  //   return [...users, ...tags];
  // }
};

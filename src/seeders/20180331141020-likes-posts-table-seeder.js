'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('likes_posts', null, {});
    const limit = 20;
    const { randomItem } = require('./../helpers');
    const { Post, User } = require('./../models');
    const items = [];
    const posts = (await Post.findAll()).map(item => item.id);
    const users = (await User.findAll()).map(item => item.id);
    let postUser;
    for (let index = 0; index < limit; index++) {
      do {
        postUser = {
          post_id: randomItem(posts),
          user_id: randomItem(users)
        };
      } while (items.findIndex(item =>
        item.post_id === postUser.post_id && item.user_id && postUser.user_id
      ) !== -1);
      items.push(postUser);
    }
    return queryInterface.bulkInsert('likes_posts', items, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('likes_posts', null, {});
  }
};

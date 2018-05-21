'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('comments', null, {});
    const limit = 20;
    const faker = require('faker/locale/es');
    const { randomItem } = require('./../helpers');
    const { User, Post } = require('./../models');
    const items = [];
    const users = (await User.findAll()).map(item => item.id);
    const posts = (await Post.findAll()).map(item => item.id);
    const now = new Date();
    let postUser;
    for (let index = 0; index < limit; index++) {
      do {
        postUser = {
          content: faker.lorem.sentence(),
          post_id: randomItem(posts),
          user_id: randomItem(users),
          created_at: now,
          updated_at: now
        };
      } while (items.findIndex(item =>
        item.post_id === postUser.post_id && item.user_id && postUser.user_id
      ) !== -1);
      items.push(postUser);
    }
    return queryInterface.bulkInsert('comments', items, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('comments', null, {});
  }
};

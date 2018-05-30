'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('subscriptions_users', null, {});
    const limit = 20;
    const { randomItem } = require('./../helpers');
    const { User } = require('./../models');
    const items = [];
    const users = (await User.findAll()).map(item => item.id);
    let data;
    for (let index = 0; index < limit; index++) {
      do {
        data = {
          user_followed: randomItem(users),
          user_follower: randomItem(users)
        };
      } while (data.user_followed === data.user_follower || items.findIndex(item =>
        item.user_followed === data.user_followed && item.user_follower && data.user_follower
      ) !== -1);
      items.push(data);
    }
    return queryInterface.bulkInsert('subscriptions_users', items, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('subscriptions_users', null, {});
  }
};

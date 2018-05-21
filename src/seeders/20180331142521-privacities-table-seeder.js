'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('privacities', null, {});
    const limit = 20;
    const { randomItem } = require('./../helpers');
    const { User, Visibility } = require('./../models');
    const users = (await User.findAll()).map(item => item.id);
    const visibility = (await Visibility.findAll());
    return queryInterface.bulkInsert('privacities', [...Array(limit)].map(_ => ({
      user_id: users.pop(),
      search: (randomItem(visibility)).name,
      posts: (randomItem(visibility)).name,
      albums: (randomItem(visibility)).name
    })), {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('privacities', null, {});
  }
};

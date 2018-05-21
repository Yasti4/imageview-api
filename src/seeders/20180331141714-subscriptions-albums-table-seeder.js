'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('subscriptions_albums', null, {});
    const limit = 20;
    const { randomItem } = require('./../helpers');
    const { User, Album } = require('./../models');
    const items = [];
    const users = (await User.findAll()).map(item => item.id);
    const albums = (await Album.findAll()).map(item => item.id);
    let albumUser;
    for (let index = 0; index < limit; index++) {
      do {
        albumUser = {
          album_id: randomItem(albums),
          user_id: randomItem(users)
        };
      } while (items.findIndex(item =>
        item.album_id === albumUser.album_id && item.user_id && albumUser.user_id
      ) !== -1);
      items.push(albumUser);
    }
    return queryInterface.bulkInsert('subscriptions_albums', items, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('subscriptions_albums', null, {});
  }
};

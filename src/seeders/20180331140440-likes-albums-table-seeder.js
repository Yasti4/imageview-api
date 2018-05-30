'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('likes_albums', null, {});
    const limit = 20;
    const { randomItem } = require('./../helpers');
    const { Album, User } = require('./../models');
    const items = [];
    const albums = (await Album.findAll()).map(item => item.id);
    const users = (await User.findAll()).map(item => item.id);
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
    return queryInterface.bulkInsert('likes_albums', items, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('likes_albums', null, {});
  }
};

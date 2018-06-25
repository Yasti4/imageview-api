'use strict';

const faker = require('faker/locale/es');
const { randomItem } = require('./../helpers');
const { Visibility, File, User, Album } = require('./../models');
const usersLimitSeeder = require('./20180330221242-users-table-seeder').limit;

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('posts', null, {});
    const limit = 20;
    const visibilities = (await Visibility.findAll()).map(item => item.name);
    const images = (await File.findAll({ offset: usersLimitSeeder })).map(item => item.id);
    const users = (await User.findAll()).map(item => item.id);
    const albums = (await Album.findAll()).map(item => item.id);
    const now = new Date();
    return queryInterface.bulkInsert('posts', [...Array(limit)].map(item => ({
      description: faker.lorem.sentence(),
      user_id: randomItem(users),
      album_id: randomItem([...albums, null, null, null]),
      file_id: randomItem(images),
      visibility: randomItem(visibilities),
      enable_comments: randomItem([true, true, true, false]),
      created_at: now,
      updated_at: now
    })), {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('posts', null, {});
  }
};

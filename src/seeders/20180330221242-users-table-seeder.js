'use strict';

const bcrypt = require('bcrypt');

const limit = 20;
exports.limit = limit;
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('users', null, {});
    const faker = require('faker/locale/es');
    const { Image } = require('./../models');
    const avatars = (await Image.findAll({ limit: limit })).map(item => item.id);
    const now = new Date();
    const password = await bcrypt.hash('secret', +process.env.APP_SALT || 10);
    return queryInterface.bulkInsert('users', [...Array(limit)].map(item => ({
      username: faker.internet.userName(),
      email: faker.internet.email(),
      password,
      name: faker.name.findName(),
      lastname: faker.name.lastName(),
      image_id: avatars.pop(),
      role: 'user',
      created_at: now,
      updated_at: now,
      deleted_at: null
    })).map((item, i) => (i !== 0 ? item : {
      ...item,
      username: 'imageview',
      email: 'info@imageview.com',
      name: 'ImageView',
      lastname: 'GraphQL API',
      role: 'admin'
    })), {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('users', null, {});
  }
};

'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const limit = 60;
    const { File } = require('./../models');
    const files = (await File.findAll({ limit: limit })).map(item => item.id);
    const { randomItem } = require('./../helpers');
    return queryInterface.bulkInsert('images', [...Array(limit)].map(item => ({
      file_id: files.pop(),
      width: +randomItem([320, 640, 1024]),
      height: +randomItem([320, 640, 1024])
    })), {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('images', null, {});
  }
};

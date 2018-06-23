'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    const limit = 60;
    const shortid = require('shortid');
    const now = new Date();
    return queryInterface.bulkInsert('files', [...Array(limit)].map(item => ({
      filename: shortid.generate() + '.jpg',
      created_at: now,
      updated_at: now,
      deleted_at: null
    })), {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('files', null, {});
  }
};

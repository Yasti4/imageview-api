'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('visibilities', null, {});
    return queryInterface.bulkInsert('visibilities', [
      { name: 'public' },
      { name: 'protected' },
      { name: 'private' }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('visibilities', null, {});
  }
};

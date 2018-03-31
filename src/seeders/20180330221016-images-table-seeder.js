'use strict';

module.exports = {
    up: async(queryInterface, Sequelize) => {
        await queryInterface.bulkDelete('images', null, {});
        const limit = 60;
        const faker = require('faker/locale/es');
        return queryInterface.bulkInsert('images', [...Array(limit)].map(item => ({
            small: faker.image.imageUrl(),
            medium: faker.image.imageUrl(),
            large: null,
        })), {});
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('images', null, {});
    }
};
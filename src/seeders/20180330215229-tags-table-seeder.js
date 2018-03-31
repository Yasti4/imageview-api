'use strict';

module.exports = {
    up: async(queryInterface, Sequelize) => {
        await queryInterface.bulkDelete('tags', null, {});
        const faker = require('faker/locale/es');
        const items = [];
        const limit = 40;
        for (let i = 0; i < limit;) {
            const name = faker.name.findName();
            if (items.findIndex(value => value.name === name) === -1) {
                items.push({
                    name
                });
                i++;
            }
        }
        return queryInterface.bulkInsert('tags', items, {});
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('tags', null, {});
    }
};
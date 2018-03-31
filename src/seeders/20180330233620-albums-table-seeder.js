'use strict';

module.exports = {
    up: async(queryInterface, Sequelize) => {
        await queryInterface.bulkDelete('albums', null, {});
        const limit = 20;
        const faker = require('faker/locale/es');
        const { randomItem  } = require('./../helpers');
        const { Visibility, User } = require('./../models');
        const visibilities = await Visibility.findAll();
        const user = (await User.findAll({ limit: limit })).map(item => item.id);
        const now = new Date();
        return queryInterface.bulkInsert('albums', [...Array(limit)].map(_ => ({
            title: faker.name.findName(),
            description: faker.name.findName(),
            visibility: (randomItem(visibilities)).name,
            user_id: user.pop(),
            created_at: now,
            updated_at: now,
        })), {});
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('albums', null, {});
    }
};
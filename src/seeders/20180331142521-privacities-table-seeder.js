'use strict';

module.exports = {
    up: async(queryInterface, Sequelize) => {
        await queryInterface.bulkDelete('privacity', null, {});
        const limit = 20;
        const faker = require('faker/locale/es');
        const { randomItem  } = require('./../helpers');
        const { User, Visibility } = require('./../models');
        const items = [];
        const users = (await User.findAll()).map(item => item.id);
        const visibility = (await Visibility.findAll());
        return queryInterface.bulkInsert('privacity', [...Array(limit)].map(_ => ({
            user_id: users.pop(),
            search: (randomItem(visibility)).name,
            posts: (randomItem(visibility)).name,
            albums: (randomItem(visibility)).name,
        })), {});
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('privacity', null, {});
    }
};
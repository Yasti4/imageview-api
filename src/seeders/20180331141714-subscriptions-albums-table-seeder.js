'use strict';

module.exports = {
    up: async(queryInterface, Sequelize) => {
        await queryInterface.bulkDelete('subscriptions_albums', null, {});
        const limit = 20;
        const faker = require('faker/locale/es');
        const { randomItem  } = require('./../helpers');
        const { User, Album } = require('./../models');
        const items = [];
        const users = (await User.findAll()).map(item => item.id);
        const albums = (await Album.findAll()).map(item => item.id);
        let album_user;
        for (let index = 0; index < limit; index++) {
            do {
                album_user = {
                    album_id: randomItem(albums),
                    user_id: randomItem(users),
                };
            } while (items.findIndex(item =>
                    item.album_id === album_user.album_id && item.user_id && album_user.user_id
                ) !== -1);
            items.push(album_user);
        }
        return queryInterface.bulkInsert('subscriptions_albums', items, {});
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('subscriptions_albums', null, {});
    }
};
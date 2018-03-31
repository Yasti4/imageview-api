'use strict';

module.exports = {
    up: async(queryInterface, Sequelize) => {
        await queryInterface.bulkDelete('likes_albums', null, {});
        const limit = 20;
        const faker = require('faker/locale/es');
        const { randomItem  } = require('./../helpers');
        const { Album, User } = require('./../models');
        const items = [];
        const albums = (await Album.findAll()).map(item => item.id);
        const users = (await User.findAll()).map(item => item.id);
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
        return queryInterface.bulkInsert('likes_albums', items, {});
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('likes_albums', null, {});
    }
};
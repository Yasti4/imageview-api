'use strict';

module.exports = {
    up: async(queryInterface, Sequelize) => {
        await queryInterface.bulkDelete('likes_posts', null, {});
        const limit = 20;
        const faker = require('faker/locale/es');
        const { randomItem  } = require('./../helpers');
        const { Post, User } = require('./../models');
        const items = [];
        const posts = (await Post.findAll()).map(item => item.id);
        const users = (await User.findAll()).map(item => item.id);
        let post_user;
        for (let index = 0; index < limit; index++) {
            do {
                post_user = {
                    post_id: randomItem(posts),
                    user_id: randomItem(users),
                };
            } while (items.findIndex(item =>
                    item.post_id === post_user.post_id && item.user_id && post_user.user_id
                ) !== -1);
            items.push(post_user);
        }
        return queryInterface.bulkInsert('likes_posts', items, {});
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('likes_posts', null, {});
    }
};
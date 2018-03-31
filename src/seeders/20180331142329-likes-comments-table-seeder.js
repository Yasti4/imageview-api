'use strict';

module.exports = {
    up: async(queryInterface, Sequelize) => {
        await queryInterface.bulkDelete('likes_comments', null, {});
        const limit = 20;
        const faker = require('faker/locale/es');
        const { randomItem  } = require('./../helpers');
        const { User, Comment } = require('./../models');
        const items = [];
        const users = (await User.findAll()).map(item => item.id);
        const comments = (await Comment.findAll()).map(item => item.id);
        let comment_user;
        for (let index = 0; index < limit; index++) {
            do {
                comment_user = {
                    comment_id: randomItem(comments),
                    user_id: randomItem(users),
                };
            } while (items.findIndex(item =>
                    item.comment_id === comment_user.comment_id && item.user_id && comment_user.user_id
                ) !== -1);
            items.push(comment_user);
        }
        return queryInterface.bulkInsert('likes_comments', items, {});
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('likes_comments', null, {});
    }
};
'use strict';

const limit = 20;
exports.limit = limit;
module.exports = {
    up: async(queryInterface, Sequelize) => {
        await queryInterface.bulkDelete('users', null, {});
        const faker = require('faker/locale/es');
        const { Role, Image } = require('./../models');
        const role = (await Role.find({ where: { name: 'user' } })).name;
        const avatars = (await Image.findAll({ limit: limit })).map(item => item.id);
        const now = new Date();
        return queryInterface.bulkInsert('users', [...Array(limit)].map(item => ({
            username: faker.internet.userName(),
            email: faker.internet.email(),
            password: faker.internet.password(),
            name: faker.name.findName(),
            lastname: faker.name.lastName(),
            image_id: avatars.pop(),
            role: role,
            created_at: now,
            updated_at: now,
            deleted_at: null,
        })).map((item, i) => (i !== 0 ? item : {
            ...item,
            username: 'imageview',
            email: 'info@imageview.com',
            password: 'secret',
            name: 'ImageView',
            lastname: 'GraphQL API',
            role: 'admin'
        })), {});
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('users', null, {});
    }
};
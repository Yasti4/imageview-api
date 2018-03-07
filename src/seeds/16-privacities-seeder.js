'use strict';

exports.seed = (knex) => {
    return knex('privacity').del().then(async() => {
        const {
            seedingLog,
            randomItem 
        } = require('./../helpers');
        const faker = require('faker/locale/es');
        const Visibility = require('./../models/visibility');
        const User = require('../models/user');
        const limit = 20;
        const visibility = (await Visibility.get()).toJSON();
        const user = (await User.take(limit).get()).toJSON().map(item => item.id);
        return knex('privacity').insert([...Array(limit)].map(_ => ({
                user_id: user.pop(),
                search: (randomItem(visibility)).name,
                posts: (randomItem(visibility)).name,
                albums: (randomItem(visibility)).name,
            })))
            .then(() => seedingLog('PrivacityTableSeeder', {
                color: 'green'
            }))
            .catch((error) => seedingLog('PrivacityTableSeeder', {
                color: 'red',
                err: error
            }));
    });
};
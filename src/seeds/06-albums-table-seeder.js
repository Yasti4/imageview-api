'use strict';

exports.seed = (knex) => {
  return knex('albums').del().then(async () => {
    const {
      seedingLog,
      randomItem 
    } = require('./../helpers');
    const faker = require('faker/locale/es');
    const Visibility = require('./../models/visibility');
    const User = require('../models/user');
    const limit = 20;
    const visibilities = (await Visibility.get()).toJSON();
    const user = (await User.take(limit).get()).toJSON().map(item => item.id);
    const now = new Date();
    return knex('albums').insert([...Array(limit)].map(_ => ({
        title: faker.name.findName(),
        description: faker.name.findName(),
        visibility: (randomItem(visibilities)).name,
        user_id: user.pop(),
        created_at: now,
        updated_at: now,
      })))
      .then(() => seedingLog('AlbumsTableSeeder', {
        color: 'green'
      }))
      .catch((error) => seedingLog('AlbumsTableSeeder', {
        color: 'red',
        err: error
      }));
  });
};
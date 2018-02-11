'use strict';

exports.seed = (knex) => {
  return knex('images').del().then(() => {
    const limit = 60;
    const log = require('./../helpers').seedingLog;
    const faker = require('faker/locale/es');
    return knex('images').insert([...Array(limit)].map(item => ({
        small: faker.image.imageUrl(),
        medium: faker.image.imageUrl(),
        large: null,
      })))
      .then(() => log('ImagesTableSeeder', {
        color: 'green'
      }))
      .catch((error) => log('ImagesTableSeeder', {
        color: 'red',
        err: error
      }));
  });
};
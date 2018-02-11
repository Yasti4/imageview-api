'use strict';

const limit = 20;
exports.limit = limit;
exports.seed = (knex) => {
  return knex('users').del().then(async () => {
    const log = require('./../helpers').seedingLog;
    const faker = require('faker/locale/es');
    const Role = require('../models/role');
    const Image = require('../models/image');
    const role = (await Role.where('name', 'user').first()).toJSON().name;
    const avatars = (await Image.take(limit).get()).toJSON().map(item => item.id);
    const now = new Date();
    return knex('users').insert([...Array(limit)].map(item => ({
        username: faker.internet.userName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
        name: faker.name.findName(),
        lastname: faker.name.lastName(),
        image: avatars.pop(),
        role: role,
        created_at: now,
        updated_at: now,
      })))
      .then(() => log('UsersTableSeeder', {
        color: 'green'
      }))
      .catch((error) => log('UsersTableSeeder', {
        color: 'red',
        err: error
      }));
  });
};
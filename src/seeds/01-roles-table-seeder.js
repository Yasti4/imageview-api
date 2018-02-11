'use strict';

exports.seed = (knex) => {
  return knex('roles').del().then(() => {
    const log = require('./../helpers').seedingLog;
    return knex('roles').insert([{
          name: 'admin'
        },
        {
          name: 'user'
        }
      ])
      .then(() => log('RolesTableSeeder', {
        color: 'green'
      }))
      .catch((error) => log('RolesTableSeeder', {
        color: 'red',
        err: error
      }));
  });
};
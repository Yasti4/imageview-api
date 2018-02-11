'use strict';

exports.seed = (knex) => {
  return knex('visibilities').del().then(() => {
    const log = require('./../helpers').seedingLog;
    return knex('visibilities').insert([{
          name: 'public'
        },
        {
          name: 'protected'
        },
        {
          name: 'private'
        },
      ])
      .then(() => log('VisibilitiesTableSeeder', {
        color: 'green'
      }))
      .catch((error) => log('VisibilitiesTableSeeder', {
        color: 'red',
        err: error
      }));
  });
}
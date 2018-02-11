'use strict';

exports.seed = (knex) => {
  return knex('tags').del().then(() => {
    const log = require('./../helpers').seedingLog;
    const faker = require('faker/locale/es');
    const items = [];
    const limit = 40;

    for (let i = 0; i < limit;) {
      const name = faker.name.findName();
      if (items.findIndex(value => value.name === name) === -1) {
        items.push({
          name
        });
        i++;
      }
    }

    return knex('tags').insert(items)
      .then(() => log('TagsTableSeeder', {
        color: 'green'
      }))
      .catch((error) => log('TagsTableSeeder', {
        color: 'red',
        err: error
      }));
  });
};
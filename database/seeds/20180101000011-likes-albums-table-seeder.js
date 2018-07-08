const factory = require('database/factories');

function seed(knex) {
  return knex.insert(factory('likes_albums', 20)).into('likes_albums');
}

module.exports = {seed};

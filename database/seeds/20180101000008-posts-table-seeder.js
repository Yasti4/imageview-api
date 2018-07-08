const factory = require('database/factories');

function seed(knex) {
  return knex.insert(factory('posts', 20)).into('posts');
}

module.exports = {seed};

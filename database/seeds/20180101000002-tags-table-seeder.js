const factory = require('database/factories');

function seed(knex) {
  return knex.insert(factory('tags', 40)).into('tags');
}

module.exports = {seed};

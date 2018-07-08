const factory = require('database/factories');

function seed(knex) {
  return knex.insert(factory('users', 20)).into('users');
}

module.exports = {seed};

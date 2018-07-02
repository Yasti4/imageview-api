const factory = require('./../factories');

function seed(knex) {
  return knex.insert(factory('users', 20)).into('users');
}

module.exports = {seed};

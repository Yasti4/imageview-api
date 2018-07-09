const factory = require('./../factories');

function seed(knex) {
  return knex.insert(factory('albums', 20)).into('albums');
}

module.exports = {seed};

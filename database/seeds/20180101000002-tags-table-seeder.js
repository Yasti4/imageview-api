const factory = require('./../factories');

function seed(knex) {
  return knex.insert(factory('tags', 40)).into('tags');
}

module.exports = {seed};

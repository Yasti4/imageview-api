const factory = require('./../factories');

function seed(knex) {
  return knex.insert(factory('images', 60)).into('images');
}

module.exports = {seed};

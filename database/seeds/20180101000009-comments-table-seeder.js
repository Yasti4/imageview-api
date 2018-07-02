const factory = require('./../factories');

function seed(knex) {
  return knex.insert(factory('comments', 20)).into('comments');
}

module.exports = {seed};

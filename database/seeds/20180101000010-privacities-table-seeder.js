const factory = require('./../factories');

function seed(knex) {
  return knex.insert(factory('privacities', 20)).into('privacities');
}

module.exports = {seed};

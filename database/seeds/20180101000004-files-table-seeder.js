const factory = require('database/factories');

function seed(knex) {
  return knex.insert(factory('files', 60)).into('files');
}

module.exports = {seed};

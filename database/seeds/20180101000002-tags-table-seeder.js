const factory = require('database/factories');

console.log('Tags: AFUERA');

function seed(knex) {
  console.log('Tags: DENTRO');
  return knex.insert(factory('tags', 40)).into('tags');
}

module.exports = {seed};

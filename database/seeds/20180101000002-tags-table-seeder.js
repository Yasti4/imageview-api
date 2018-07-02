const {TagFactory} = require('./../factories');

function seed(knex) {
  return knex.insert(TagFactory(40)).into('tags');
}

module.exports = {seed};

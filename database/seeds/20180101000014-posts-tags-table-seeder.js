const factory = require('./../factories');

function seed(knex) {
  return knex.insert(factory('posts_tags', 20)).into('posts_tags');
}

module.exports = {seed};

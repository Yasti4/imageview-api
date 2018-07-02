const factory = require('./../factories');

function seed(knex) {
  return knex.insert(factory('likes_posts', 20)).into('likes_posts');
}

module.exports = {seed};

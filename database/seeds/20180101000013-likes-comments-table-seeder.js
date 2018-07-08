const factory = require('database/factories');

function seed(knex) {
  return knex.insert(factory('likes_comments', 20)).into('likes_comments');
}

module.exports = {seed};

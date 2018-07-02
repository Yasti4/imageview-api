const factory = require('./../factories');

function seed(knex) {
  return knex.insert(factory('subscriptions_albums', 20)).into('subscriptions_albums');
}

module.exports = {seed};

const factory = require('database/factories');

function seed(knex) {
  return knex.insert(factory('subscriptions_users', 20)).into('subscriptions_users');
}

module.exports = {seed};

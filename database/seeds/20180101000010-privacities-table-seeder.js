const factory = require('./../factories');

function seed(knex) {
  return knex.select('id').from('users').then(users => {
    return knex.insert(users.map(user => {
      return factory('privacities', 1, () => ({user_id: user.id}));
    })).into('privacities');
  });
}

module.exports = {seed};

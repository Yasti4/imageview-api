const factory = require('database/factories');

function seed(knex) {
  return knex.insert([
    factory('users', 1, () => ({
      username: 'imageview',
      email: 'info@imageview.com',
      name: 'Image',
      lastname: 'View',
      role: 'admin'
    })),
    ...factory('users', 19)
  ]).into('users');
}

module.exports = {seed};

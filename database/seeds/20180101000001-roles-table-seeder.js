function seed(knex) {
  return knex.insert([
    {name: 'admin'},
    {name: 'user'}
  ]).into('roles');
}

module.exports = {seed};

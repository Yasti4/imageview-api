function seed(knex) {
  return knex.insert([
    {name: 'public'},
    {name: 'protected'},
    {name: 'private'}
  ]).into('visibilities');
}

module.exports = {seed};

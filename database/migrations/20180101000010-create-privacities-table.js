function up(knex) {
  return knex.schema.createTable('privacities', (t) => {
    t.increments('id').primary();
    t.integer('user_id').unsigned().notNullable().references('id').inTable('users');
    t.string('search').references('name').inTable('visibilities');
    t.string('posts').references('name').inTable('visibilities');
    t.string('albums').references('name').inTable('visibilities');
  });
}

function down(knex) {
  return knex.schema.dropTable('privacities');
}

module.exports = {up, down};

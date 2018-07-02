function up(knex) {
  return knex.schema.createTable('tags', (t) => {
    t.increments('id').primary();
    t.string('name').unique().notNullable();
  });
}

function down(knex) {
  return knex.schema.dropTable('tags');
}

module.exports = {up, down};

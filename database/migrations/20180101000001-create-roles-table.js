function up(knex) {
  return knex.schema.createTable('roles', (t) => {
    t.string('name').primary();
  });
}

function down(knex) {
  return knex.schema.dropTable('roles');
}

module.exports = {up, down};

function up(knex) {
  return knex.schema.createTable('visibilities', (t) => {
    t.string('name').primary();
  });
}

function down(knex) {
  return knex.schema.dropTable('visibilities');
}

module.exports = {up, down};


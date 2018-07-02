function up(knex) {
  return knex.schema.createTable('files', (t) => {
    t.increments('id').primary();
    t.string('filename').unique().notNullable();
    t.timestamp('created_at').nullable();
    t.timestamp('updated_at').nullable();
    t.timestamp('deleted_at').nullable();
  });
}

function down(knex) {
  return knex.schema.dropTable('files');
}

module.exports = {up, down};

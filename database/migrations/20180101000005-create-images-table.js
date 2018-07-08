function up(knex) {
  return knex.schema.createTable('images', (t) => {
    t.increments('id').primary();
    t.integer('file_id').unsigned().notNullable()
      .references('id').inTable('files')
      .onUpdate('CASCADE').onDelete('CASCADE');
    t.integer('width').notNullable();
    t.integer('height').notNullable();
  });
}

function down(knex) {
  return knex.schema.dropTable('images');
}

module.exports = {up, down};

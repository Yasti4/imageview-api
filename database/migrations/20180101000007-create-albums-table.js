function up(knex) {
  return knex.schema.createTable('albums', (t) => {
    t.increments('id').primary();
    t.string('title').notNullable();
    t.string('description').notNullable();
    t.integer('user_id').unsigned().notNullable()
      .references('id').inTable('users')
      .onUpdate('CASCADE').onDelete('CASCADE');
    t.string('visibility').notNullable()
      .references('name').inTable('visibilities')
      .onUpdate('CASCADE').onDelete('CASCADE');
    t.timestamp('created_at').nullable();
    t.timestamp('updated_at').nullable();
    t.timestamp('deleted_at').nullable();
  });
}

function down(knex) {
  return knex.schema.dropTable('albums');
}

module.exports = {up, down};

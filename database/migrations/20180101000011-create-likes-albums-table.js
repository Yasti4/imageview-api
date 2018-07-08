function up(knex) {
  return knex.schema.createTable('likes_albums', (t) => {
    t.increments('id').primary();
    t.integer('album_id').unsigned().notNullable()
      .references('id').inTable('albums')
      .onUpdate('CASCADE').onDelete('CASCADE');
    t.integer('user_id').unsigned().notNullable()
      .references('id').inTable('users')
      .onUpdate('CASCADE').onDelete('CASCADE');
    t.unique(['album_id', 'user_id']);
  });
}

function down(knex) {
  return knex.schema.dropTable('likes_albums');
}

module.exports = {up, down};

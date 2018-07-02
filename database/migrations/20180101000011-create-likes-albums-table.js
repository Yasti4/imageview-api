function up(knex) {
  return knex.schema.createTable('likes_albums', (t) => {
    t.increments('id').primary();
    t.integer('album_id').unsigned().notNullable().references('id').inTable('albums');
    t.integer('user_id').unsigned().notNullable().references('id').inTable('users');
  });
}

function down(knex) {
  return knex.schema.dropTable('likes_albums');
}

module.exports = {up, down};

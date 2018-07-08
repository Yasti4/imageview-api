function up(knex) {
  return knex.schema.createTable('subscriptions_albums', (t) => {
    t.increments('id').primary();
    t.integer('user_id').unsigned().notNullable().references('id').inTable('users');
    t.integer('album_id').unsigned().notNullable().references('id').inTable('albums');
    t.unique(['user_id', 'album_id']);
  });
}

function down(knex) {
  return knex.schema.dropTable('subscriptions_albums');
}

module.exports = {up, down};

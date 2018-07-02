function up(knex) {
  return knex.schema.createTable('likes_posts', (t) => {
    t.increments('id').primary();
    t.integer('post_id').unsigned().notNullable().references('id').inTable('posts');
    t.integer('user_id').unsigned().notNullable().references('id').inTable('users');
  });
}

function down(knex) {
  return knex.schema.dropTable('likes_posts');
}

module.exports = {up, down};

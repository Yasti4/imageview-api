function up(knex) {
  return knex.schema.createTable('likes_posts', (t) => {
    t.increments('id').primary();
    t.integer('post_id').unsigned().notNullable()
      .references('id').inTable('posts')
      .onUpdate('CASCADE').onDelete('CASCADE');
    t.integer('user_id').unsigned().notNullable()
      .references('id').inTable('users')
      .onUpdate('CASCADE').onDelete('CASCADE');
    t.unique(['post_id', 'user_id']);
  });
}

function down(knex) {
  return knex.schema.dropTable('likes_posts');
}

module.exports = {up, down};

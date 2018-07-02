function up(knex) {
  return knex.schema.createTable('likes_comments', (t) => {
    t.increments('id').primary();
    t.integer('comment_id').unsigned().notNullable().references('id').inTable('comments');
    t.integer('user_id').unsigned().notNullable().references('id').inTable('users');
  });
}

function down(knex) {
  return knex.schema.dropTable('likes_comments');
}

module.exports = {up, down};

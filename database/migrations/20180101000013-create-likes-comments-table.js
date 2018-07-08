function up(knex) {
  return knex.schema.createTable('likes_comments', (t) => {
    t.increments('id').primary();
    t.integer('comment_id').unsigned().notNullable()
      .references('id').inTable('comments')
      .onUpdate('CASCADE').onDelete('CASCADE');
    t.integer('user_id').unsigned().notNullable()
      .references('id').inTable('users')
      .onUpdate('CASCADE').onDelete('CASCADE');
    t.unique(['comment_id', 'user_id']);
  });
}

function down(knex) {
  return knex.schema.dropTable('likes_comments');
}

module.exports = {up, down};

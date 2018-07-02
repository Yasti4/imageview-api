function up(knex) {
  return knex.schema.createTable('comments', (t) => {
    t.increments('id').primary();
    t.string('content').notNullable();
    t.integer('user_id').unsigned().notNullable().references('id').inTable('users');
    t.integer('post_id').unsigned().notNullable().references('id').inTable('posts');
    t.timestamp('created_at').nullable();
    t.timestamp('updated_at').nullable();
    t.timestamp('deleted_at').nullable();
  });
}

function down(knex) {
  return knex.schema.dropTable('comments');
}

module.exports = {up, down};

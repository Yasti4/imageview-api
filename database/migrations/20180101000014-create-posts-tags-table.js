function up(knex) {
  return knex.schema.createTable('posts_tags', (t) => {
    t.increments('id').primary();
    t.integer('post_id').unsigned().notNullable().references('id').inTable('posts');
    t.integer('tag_id').unsigned().notNullable().references('id').inTable('tags');
  });
}

function down(knex) {
  return knex.schema.dropTable('posts_tags');
}

module.exports = {up, down};

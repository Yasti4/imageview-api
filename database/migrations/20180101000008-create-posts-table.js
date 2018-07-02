function up(knex) {
  return knex.schema.createTable('posts', (t) => {
    t.increments('id').primary();
    t.string('description').nullable();
    t.boolean('enable_comments').notNullable();
    t.integer('user_id').unsigned().notNullable().references('id').inTable('users');
    t.integer('album_id').unsigned().notNullable().nullable().references('id').inTable('albums');
    t.integer('file_id').unsigned().notNullable().references('id').inTable('files');
    t.string('visibility').notNullable().references('name').inTable('visibilities');
    t.timestamp('created_at').nullable();
    t.timestamp('updated_at').nullable();
    t.timestamp('deleted_at').nullable();
  });
}

function down(knex) {
  return knex.schema.dropTable('posts');
}

module.exports = {up, down};

function up(knex) {
  return knex.schema.createTable('privacities', (t) => {
    t.increments('id').primary();
    t.integer('user_id').unsigned().unique().notNullable().references('id').inTable('users');
    t.string('search')
      .references('name').inTable('visibilities')
      .onUpdate('CASCADE').onDelete('CASCADE');
    t.string('posts')
      .references('name').inTable('visibilities')
      .onUpdate('CASCADE').onDelete('CASCADE');
    t.string('albums')
      .references('name').inTable('visibilities')
      .onUpdate('CASCADE').onDelete('CASCADE');
  });
}

function down(knex) {
  return knex.schema.dropTable('privacities');
}

module.exports = {up, down};

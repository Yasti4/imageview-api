function up(knex) {
  return knex.schema.createTable('users', (t) => {
    t.increments('id').primary();
    t.string('username').unique().notNullable();
    t.string('email').unique().notNullable();
    t.string('password').notNullable();
    t.string('name').notNullable();
    t.string('lastname').notNullable();
    t.string('role').notNullable().references('name').inTable('roles');
    t.integer('file_id').unsigned().notNullable().references('id').inTable('files');
    t.timestamp('created_at').nullable();
    t.timestamp('updated_at').nullable();
    t.timestamp('deleted_at').nullable();
  });
}

function down(knex) {
  return knex.schema.dropTable('users');
}

module.exports = {up, down};

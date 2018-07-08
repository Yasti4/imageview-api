function up(knex) {
  return knex.schema.createTable('subscriptions_users', (t) => {
    t.increments('id').primary();
    t.integer('user_followed').unsigned().notNullable()
      .references('id').inTable('users')
      .onUpdate('CASCADE').onDelete('CASCADE');
    t.integer('user_follower').unsigned().notNullable()
      .references('id').inTable('users')
      .onUpdate('CASCADE').onDelete('CASCADE');
    t.unique(['user_followed', 'user_follower']);
  });
}

function down(knex) {
  return knex.schema.dropTable('subscriptions_users');
}

module.exports = {up, down};

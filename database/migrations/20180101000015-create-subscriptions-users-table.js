function up(knex) {
  return knex.schema.createTable('subscriptions_users', (t) => {
    t.increments('id').primary();
    t.integer('user_followed').unsigned().notNullable().references('id').inTable('users');
    t.integer('user_follower').unsigned().notNullable().references('id').inTable('users');
    t.unique(['user_followed', 'user_follower']);
  });
}

function down(knex) {
  return knex.schema.dropTable('subscriptions_users');
}

module.exports = {up, down};

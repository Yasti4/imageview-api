'use strict';

const log = require('./../helpers').migratingLog;
const filename = 'CreateSubscriptionsUsersTable';

exports.up = function (knex, Promise) {
  return Promise.all([
    knex.schema.createTable('subscriptions_users', function (table) {
      table.bigIncrements('id').unsigned().primary();
      table.integer('user_followed').unsigned().notNullable()
        .references('id')
        .inTable('users')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
      table.integer('user_follower').unsigned().notNullable()
        .references('id')
        .inTable('users')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
      table.unique(['user_followed', 'user_follower']);
    }).then(() => log(filename, { 
      color: 'green',
      type: 'up'
    })).catch((err) => log(filename, {
      color: 'red',
      type: 'up'
    }))
  ])
};

exports.down = function (knex, Promise) {
  return Promise.all([
    knex.schema.dropTableIfExists('subscriptions_users')
    .then(() => log(filename, { 
      color: 'green',
      type: 'down'
    })).catch((err) => log(filename, {
      color: 'red',
      type: 'down',
      err: err
    }))
  ])
};
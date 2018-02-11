'use strict';

const log = require('./../helpers').migratingLog;
const filename = 'CreateSubscriptionsAlbumsTable';

exports.up = function (knex, Promise) {
  return Promise.all([
    knex.schema.createTable('subscriptions_albums', function (table) {
      table.bigIncrements('id').unsigned().primary();
      table.integer('album_id').unsigned().notNullable()
        .references('id')
        .inTable('albums')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
      table.integer('user_id').unsigned().notNullable()
        .references('id')
        .inTable('users')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
      table.unique(['album_id', 'user_id']);
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
    knex.schema.dropTableIfExists('subscriptions_albums')
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
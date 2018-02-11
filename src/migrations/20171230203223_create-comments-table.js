'use strict';

const log = require('./../helpers').migratingLog;
const filename = 'CreateCommentsTable';

exports.up = function (knex, Promise) {
  return Promise.all([
    knex.schema.createTable('comments', function (table) {
      table.increments('id').unsigned().primary();
      table.string('content').notNullable();
      table.integer('post_id').unsigned().notNullable()
        .references('id')
        .inTable('posts')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
      table.integer('user_id').unsigned().notNullable()
        .references('id')
        .inTable('users')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
      table.unique(['post_id', 'user_id']);
      table.timestamp('created_at').nullable();
      table.timestamp('updated_at').nullable();
      table.timestamp('deleted_at').nullable();
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
    knex.schema.dropTableIfExists('comments')
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
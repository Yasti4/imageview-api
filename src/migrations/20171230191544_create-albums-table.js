'use strict';

const log = require('./../helpers').migratingLog;
const filename = 'CreateAlbumsTable';

exports.up = function (knex, Promise) {
  return Promise.all([
    knex.schema.createTable('albums', function (table) {
      table.increments('id').primary().unsigned();
      table.string('title').notNullable();
      table.string('description').nullable();
      table.integer('user_id').unsigned().notNullable()
        .references('id')
        .inTable('users')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
      table.string('visibility').notNullable()
        .references('name')
        .inTable('visibilities')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
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
    knex.schema.dropTableIfExists('albums')
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
'use strict';

const log = require('./../helpers').migratingLog;
const filename = 'CreateUsersTable';

exports.up = function (knex, Promise) {
  return Promise.all([
    knex.schema.createTable('users', function (table) {
      table.increments('id').unsigned().primary();
      table.string('username').notNullable().unique();
      table.string('email').notNullable().unique();
      table.string('password').notNullable();
      table.string('name').nullable();
      table.string('lastname').nullable();
      table.integer('image').unsigned().notNullable()
        .references('id')
        .inTable('images')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
      table.string('role').notNullable()
        .references('name')
        .inTable('roles')
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
    knex.schema.dropTableIfExists('users')
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
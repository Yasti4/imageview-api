'use strict';

const log = require('./../helpers').migratingLog;
const filename = 'CreateRolesTable';

exports.up = function (knex, Promise) {
  return Promise.all([
    knex.schema.createTable('roles', function (table) {
      table.string('name').primary();
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
    knex.schema.dropTableIfExists('roles')
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
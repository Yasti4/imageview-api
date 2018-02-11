'use strict';

const log = require('./../helpers').migratingLog;
const filename = 'CreateVisibilitiesTable';

exports.up = function (knex, Promise) {
  return Promise.all([
    knex.schema.createTable('visibilities', function (table) {
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
    knex.schema.dropTableIfExists('visibilities')
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
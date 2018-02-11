'use strict';

const log = require('./../helpers').migratingLog;
const filename = 'CreateTagsTable';

exports.up = function (knex, Promise) {
  return Promise.all([
    knex.schema.createTable('tags', function (table) {
      table.increments('id').primary().unsigned();
      table.string('name').unique().notNullable();
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
    knex.schema.dropTableIfExists('tags')
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
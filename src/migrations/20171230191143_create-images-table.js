'use strict';

const log = require('./../helpers').migratingLog;
const filename = 'CreateImagesTable';

exports.up = function (knex, Promise) {
  return Promise.all([
    knex.schema.createTable('images', function (table) {
      table.increments('id').primary().unsigned();
      table.string('small').notNullable();
      table.string('medium').nullable();
      table.string('large').nullable();
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
    knex.schema.dropTableIfExists('images')
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
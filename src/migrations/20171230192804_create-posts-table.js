'use strict';

const log = require('./../helpers').migratingLog;
const filename = 'CreatePostsTable';

exports.up = function (knex, Promise) {
  return Promise.all([
    knex.schema.createTable('posts', function (table) {
      table.increments('id').unsigned().primary();
      table.string('title').notNullable();
      table.string('description').nullable();
      table.integer('user_id').unsigned().notNullable()
        .references('id')
        .inTable('users')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
      table.integer('album_id').unsigned().nullable()
        .references('id')
        .inTable('albums')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
      table.integer('image').unsigned().notNullable()
        .references('id')
        .inTable('images')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
      table.string('visibility').notNullable()
        .references('name')
        .inTable('visibilities')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
      table.boolean('enable_comments').notNullable()
        .defaultTo(true);
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
    knex.schema.dropTableIfExists('posts')
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
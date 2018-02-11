'use strict';

const log = require('./../helpers').migratingLog;
const filename = 'CreateLikesPostsTable';

exports.up = function (knex, Promise) {
  return Promise.all([
    knex.schema.createTable('likes_posts', function (table) {
      table.bigIncrements('id').unsigned().primary();
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
    knex.schema.dropTableIfExists('likes_posts')
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
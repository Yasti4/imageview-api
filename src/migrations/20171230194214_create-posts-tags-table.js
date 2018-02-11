'use strict';

const log = require('./../helpers').migratingLog;
const filename = 'CreatePostsTagsTable';

exports.up = function (knex, Promise) {
  return Promise.all([
    knex.schema.createTable('posts_tags', function (table) {
      table.bigIncrements('id').unsigned().primary();
      table.integer('post_id').unsigned().notNullable()
        .references('id')
        .inTable('posts')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
      table.integer('tag_id').unsigned().notNullable()
        .references('id')
        .inTable('tags')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
      table.unique(['post_id', 'tag_id']);
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
    knex.schema.dropTableIfExists('posts_tags')
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
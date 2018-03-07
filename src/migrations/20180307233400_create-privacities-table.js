'use strict';

const log = require('./../helpers').migratingLog;
const filename = 'CreatePrivacitiesTable';

exports.up = function(knex, Promise) {
    return Promise.all([
        knex.schema.createTable('privacity', function(table) {
            table.increments('id').primary().unsigned();
            table.integer('user_id').unsigned().notNullable()
                .references('id')
                .inTable('users')
                .onUpdate('CASCADE')
                .onDelete('CASCADE');
            table.string('search').notNullable()
                .references('name')
                .inTable('visibilities')
                .onUpdate('CASCADE')
                .onDelete('CASCADE');
            table.string('posts').notNullable()
                .references('name')
                .inTable('visibilities')
                .onUpdate('CASCADE')
                .onDelete('CASCADE');
            table.string('albums').notNullable()
                .references('name')
                .inTable('visibilities')
                .onUpdate('CASCADE')
                .onDelete('CASCADE');
        }).then(() => log(filename, { 
            color: 'green',
            type: 'up'
        })).catch((err) => log(filename, {
            color: 'red',
            type: 'up'
        }))
    ])
};

exports.down = function(knex, Promise) {
    return Promise.all([
        knex.schema.dropTableIfExists('privacity')
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
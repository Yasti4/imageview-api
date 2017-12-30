'use strict';

var dbm;
var type;
var seed;

/**
 * We receive the dbmigrate dependency from dbmigrate initially.
 * This enables us to not have to rely on NODE_PATH.
 */
exports.setup = function(options, seedLink) {
    dbm = options.dbmigrate;
    type = dbm.dataType;
    seed = seedLink;
};

exports.up = function(db) {
    return db.createTable('images', {
        columns: {
            id: {
                type: 'int',
                primaryKey: true,
                unsigned: true
            },
            small: {
                type: 'string',
                notNull: true
            },
            medium: {
                type: 'string',
                notNull: true
            },
            large: {
                type: 'string',
                notNull: false
            },
            huge: {
                type: 'string',
                notNull: false
            }
        },
        ifNotExists: true
    });
};

exports.down = function(db) {
    return db.dropTable('images');
};

exports._meta = {
    "version": 1
};
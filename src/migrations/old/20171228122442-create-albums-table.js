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
    return db.createTable('albums', {
        columns: {
            id: {
                type: 'int',
                primaryKey: true,
                unsigned: true
            },
            title: {
                type: 'string',
                notNull: true
            },
            description: {
                type: 'string',
                notNull: false
            },
            visibility: {
                type: 'string',
                notNull: true,
                foreignKey: {
                    name: 'albums_visibility_fk',
                    table: 'visibilities',
                    rules: {
                        onDelete: 'RESTRICT',
                        onUpdate: 'RESTRICT'
                    },
                    mapping: 'name'
                }
            },
            created_at: {
                type: 'timestamp',
                notNull: false
            },
            updated_at: {
                type: 'timestamp',
                notNull: false
            },
            deleted_at: {
                type: 'timestamp',
                notNull: false
            },
        },
        ifNotExists: true
    });
};

exports.down = function(db) {
    return db.dropTable('albums');
};

exports._meta = {
    "version": 1
};
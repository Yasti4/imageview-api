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
    return db.createTable('comments', {
        columns: {
            id: {
                type: 'int',
                primaryKey: true,
                unsigned: true
            },
            comment: {
                type: 'string',
                notNull: true
            },
            post_id: {
                type: 'int',
                unsigned: true,
                notNull: true,
                foreignKey: {
                    name: 'comments_post_id_fk',
                    table: 'posts',
                    rules: {
                        onDelete: 'RESTRICT',
                        onUpdate: 'RESTRICT'
                    },
                    mapping: 'id'
                }
            },
            user_id: {
                type: 'int',
                unsigned: true,
                notNull: true,
                foreignKey: {
                    name: 'comments_user_id_fk',
                    table: 'users',
                    rules: {
                        onDelete: 'RESTRICT',
                        onUpdate: 'RESTRICT'
                    },
                    mapping: 'id'
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
    return db.dropTable('comments');
};

exports._meta = {
    "version": 1
};
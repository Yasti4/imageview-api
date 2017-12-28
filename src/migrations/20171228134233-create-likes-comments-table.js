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
    return db.createTable('likes_comments', {
        columns: {
            id: {
                type: 'bigint',
                primaryKey: true,
                unsigned: true
            },
            comment_id: {
                type: 'int',
                unsigned: true,
                notNull: true,
                foreignKey: {
                    name: 'likes_comments_comment_id_fk',
                    table: 'comments',
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
                    name: 'likes_comments_user_id_fk',
                    table: 'users',
                    rules: {
                        onDelete: 'RESTRICT',
                        onUpdate: 'RESTRICT'
                    },
                    mapping: 'id'
                }
            }
        },
        ifNotExists: true
    });
};

exports.down = function(db) {
    return db.dropTable('likes_comments');
};

exports._meta = {
    "version": 1
};
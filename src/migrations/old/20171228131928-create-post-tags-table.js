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
    return db.createTable('post_tags', {
        columns: {
            id: {
                type: 'bigint',
                primaryKey: true,
                unsigned: true
            },
            post_id: {
                type: 'int',
                unsigned: true,
                notNull: true,
                foreignKey: {
                    name: 'post_tags_post_id_fk',
                    table: 'posts',
                    rules: {
                        onDelete: 'RESTRICT',
                        onUpdate: 'RESTRICT'
                    },
                    mapping: 'id'
                }
            },
            tag_id: {
                type: 'int',
                unsigned: true,
                notNull: true,
                foreignKey: {
                    name: 'post_tags_tag_id_fk',
                    table: 'tags',
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
    return db.dropTable('post_tags');
};

exports._meta = {
    "version": 1
};
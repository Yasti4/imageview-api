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
    return db.createTable('posts', {
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
            descriptions: {
                type: 'string',
                notNull: false
            },
            user_id: {
                type: 'int',
                unsigned: true,
                notNull: true,
                foreignKey: {
                    name: 'posts_user_id_fk',
                    table: 'users',
                    rules: {
                        onDelete: 'RESTRICT',
                        onUpdate: 'RESTRICT'
                    },
                    mapping: 'id'
                }
            },
            album_id: {
                type: 'int',
                unsigned: true,
                notNull: true,
                foreignKey: {
                    name: 'posts_album_id_fk',
                    table: 'albums',
                    rules: {
                        onDelete: 'RESTRICT',
                        onUpdate: 'RESTRICT'
                    },
                    mapping: 'id'
                }
            },
            image: {
                type: 'int',
                unsigned: true,
                notNull: true,
                foreignKey: {
                    name: 'posts_image_fk',
                    table: 'images',
                    rules: {
                        onDelete: 'RESTRICT',
                        onUpdate: 'RESTRICT'
                    },
                    mapping: 'id'
                }
            },
            visibility: {
                type: 'string',
                notNull: true,
                foreignKey: {
                    name: 'posts_visibility_fk',
                    table: 'visibilities',
                    rules: {
                        onDelete: 'RESTRICT',
                        onUpdate: 'RESTRICT'
                    },
                    mapping: 'name'
                }
            },
            enable_comments: {
                type: 'boolean',
                unsigned: true,
                defaultValue: true
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
    return db.dropTable('posts');
};

exports._meta = {
    "version": 1
};
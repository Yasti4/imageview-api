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
    return db.createTable('users', {
        columns: {
            id: {
                type: 'int',
                primaryKey: true,
                unsigned: true
            },
            username: {
                type: 'string',
                unique: true,
                notNull: true
            },
            email: {
                type: 'string',
                unique: true,
                notNull: true
            },
            password: {
                type: 'string',
                notNull: true
            },
            name: {
                type: 'string',
                notNull: false
            },
            lastname: {
                type: 'string',
                notNull: false
            },
            image: {
                type: 'int',
                unsigned: true,
                notNull: true,
                foreignKey: {
                    name: 'user_image_fk',
                    table: 'images',
                    rules: {
                        onDelete: 'RESTRICT',
                        onUpdate: 'RESTRICT'
                    },
                    mapping: 'id'
                }
            },
            role: {
                type: 'string',
                notNull: true,
                foreignKey: {
                    name: 'users_role_fk',
                    table: 'roles',
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
    return db.dropTable('users');
};

exports._meta = {
    "version": 1
};
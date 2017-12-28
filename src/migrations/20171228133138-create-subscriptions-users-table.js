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
    return db.createTable('subscriptions_users', {
        columns: {
            id: {
                type: 'bigint',
                primaryKey: true,
                unsigned: true
            },
            user_followed: {
                type: 'int',
                unsigned: true,
                notNull: true,
                foreignKey: {
                    name: 'subscriptions_users_user_followed_fk',
                    table: 'users',
                    rules: {
                        onDelete: 'RESTRICT',
                        onUpdate: 'RESTRICT'
                    },
                    mapping: 'id'
                }
            },
            user_follower: {
                type: 'int',
                unsigned: true,
                notNull: true,
                foreignKey: {
                    name: 'subscriptions_users_user_follower_fk',
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
    return db.dropTable('subscriptions_users');
};

exports._meta = {
    "version": 1
};
'use strict';

require('dotenv').load();

module.exports = {
    [process.env.NODE_ENV]: {
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
        host: process.env.DB_HOST,
        dialect: process.env.DB_CONNECTION,
        migrationStorageTableName: process.env.DB_MIGRATIONS_TABLENAME,
        operatorsAliases: false,
        charset: process.env.DB_CHARSET,
        collate: process.env.DB_COLLATION
    }
};
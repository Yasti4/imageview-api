require('dotenv').config();
module.exports = {
    development: {
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
        host: process.env.DB_HOST,
        dialect: process.env.DB_CONNECTION,
        migrationStorageTableName: process.env.MIGRATION_TABLENAME,
        seederStorageTableName: process.env.SEEDER_TABLENAME,
        operatorsAliases: false
    }
}
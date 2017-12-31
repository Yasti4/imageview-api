module.exports = {
    dev: {
        client: 'mysql',
        connection: {
            host: 'localhost',
            user: 'root',
            password: 'root',
            database: 'www_imageview'
        },
        migrations: {
            directory: "./dist/src/migrations",
            tableName: "migration"
        },
        seeds: {
            directory: './dist/src/migrations/seeds'
        }
    }
};

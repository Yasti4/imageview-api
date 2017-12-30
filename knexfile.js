module.exports = {
    dev: {
        client: 'mysql',
        connection: {
            host: 'localhost',
            user: 'root',
            password: 'root',
            database: 'www_imageview'
                // charset: 'utf8'
        },
        // pool: {
        //     min: 2,
        //     max: 10
        // },
        migrations: {
            directory: "./src/migrations",
            tableName: "migration"
        }
    }
};
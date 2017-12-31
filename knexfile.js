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
      directory: "./dist/src/migrations",
      tableName: "migration"
    },
    seeds: {
      directory: './dist/src/migrations/seeds'
    }
  }
};

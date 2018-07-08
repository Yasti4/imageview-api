const migrate = require('tabel/lib/migrate');

module.exports = run;

function run(args) {
  // http://tabel.fractaltech.in/migrations.html#migrate-js
  migrate(config, 'latest');
}

const config = {
  db: {
    client: process.env.DB_CONNECTION,
    connection: {
      database: process.env.DB_DATABASE,
      host: process.env.DB_HOST,
      user: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: process.env.DB_MIGRATIONS_TABLENAME,
      directory: 'database/migrations'
    },
    seeds: {
      directory: 'database/seeds'
    }
  }
};

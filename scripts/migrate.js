const migrate = require('tabel/lib/migrate');
const path = require('path');

module.exports = run;
function run(args) {
  console.log('ddg');
  // http://tabel.fractaltech.in/migrations.html#migrate-js
  migrate(config, {
    args: ['latest'],
    devDir: path.join(`${__dirname}/../database/migrations`),
    distDir: path.join(`${__dirname}/../database/migrations`)
  });
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
      directory: 'database/migrations/'
    },
    seeds: {
      directory: 'database/seeds'
    }
  }
};

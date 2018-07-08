const migrate = require('tabel/lib/migrate');
const path = require('path');

module.exports = function run(args) {
  // http://tabel.fractaltech.in/migrations.html#migrate-js
  switch (args[1]) {
    case 'make':
      runMigrate(args[1], args[2]);
      break;
    case 'latest':
      runMigrate(args[1]);
      break;
    case 'rollback':
      runMigrate(args[1]);
      break;
    case 'reset':
      runMigrate(args[1]);
      break;
    case 'refresh':
      runMigrate(args[1]);
      break;
    default:
      runMigrate();
  }
};

function runMigrate(...args) {
  migrate(config, {
    args,
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

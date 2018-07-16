const Tabel = require('tabel');
const migrator = require('tabel/lib/migrator');
const path = require('path');

module.exports = function run(args) {
  // http://tabel.fractaltech.in/migrations.html#migrate-js
  switch (args[1]) {
    case 'make':
      return runMigrate(args[1], args[2]);
    case 'latest':
      return runMigrate(args[1]);
    case 'rollback':
      return runMigrate(args[1]);
    case 'reset':
      return runMigrate(args[1]);
    case 'refresh':
      return runMigrate(args[1]);
    default:
      return runMigrate();
  }
};

function runMigrate(...args) {
  const orm = new Tabel(config);
  return migrator(orm).mount({
    args,
    devDir: path.join(`${__dirname}/../database/migrations`),
    distDir: path.join(`${__dirname}/../database/migrations`)
  }).then(function () {
    return orm.close();
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

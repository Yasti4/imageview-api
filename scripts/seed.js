const Tabel = require('tabel');

module.exports = function run(args) {
  // https://knexjs.org/#Seeds-API
  const orm = new Tabel(config);
  switch(args[1]) {
    case 'make':
      return orm.knex.seed.make(args[2]).then(() => {
        orm.knex.destroy();
        console.log('Seed created!');
      });
    case 'run':
      console.log('Seeding...');
      return orm.knex.seed.run().then(() => {
        orm.knex.destroy();
        console.log('Seeded!');
      });
    default:
      console.log('Avaliable Commands:\nmake\nrun');
  }
};

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

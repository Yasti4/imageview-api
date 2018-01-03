const knex = require('knex')(require('./../config/knexfile').development);
const args = process.argv;

if (args.find(arg => arg === '--rollback')) {
	knex.client.config.seeds.directory = 'dist/migrations';
	knex.migrate.rollback().then(() => knex.destroy());
} else if (args.find(arg => arg === '--make')) {
	knex.migrate.make(args[args.findIndex(arg => arg === '--make') + 1]).then(() => knex.destroy());
} else if (args.find(arg => arg === '--migrate')) {
	knex.client.config.seeds.directory = 'dist/migrations';
	knex.migrate.latest().then(() => knex.destroy());
} else {
	knex.destroy();
}

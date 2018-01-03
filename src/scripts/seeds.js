const knex = require('knex')(require('./../config/knexfile').development);
const args = process.argv;

if (args.find(arg => arg === '--run')) {
	knex.client.config.seeds.directory = 'dist/seeds';
	knex.seed.run().then(() => knex.destroy());
} else if (args.find(arg => arg === '--make')) {
	knex.seed.make(args[args.findIndex(arg => arg === '--make') + 1]).then(() => knex.destroy());
} else {
	knex.destroy();
}
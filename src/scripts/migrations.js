'use strict';

const knex = require('./../config/knex');
const args = process.argv;
const onFinish = () => knex.destroy();

if (args.find(arg => arg === '--rollback')) {
	knex.migrate.rollback().then(onFinish);
} else if (args.find(arg => arg === '--make')) {
	knex.migrate.make(args[args.findIndex(arg => arg === '--make') + 1]).then(onFinish);
} else if (args.find(arg => arg === '--migrate')) {
	knex.migrate.latest().then(onFinish);
} else {
	onFinish();
}
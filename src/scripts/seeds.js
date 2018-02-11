'use strict';

const knex = require('./../config/knex');
const args = process.argv;
const onFinish = () => knex.destroy();

if (args.find(arg => arg === '--run')) {
    knex.seed.run().then(onFinish);
} else if (args.find(arg => arg === '--make')) {
    knex.seed.make(args[args.findIndex(arg => arg === '--make') + 1]).then(onFinish);
} else {
    onFinish();
}
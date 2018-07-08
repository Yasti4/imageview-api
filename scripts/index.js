'use strict';

require('dotenv').load();

const chalk = require('chalk');
const log = console.log;

bootstrap();
run();

function bootstrap() {
  log('\x1B[2J');
  log(chalk.bgCyan(' INFO '), 'ImageView scripts initialized\n');

  process.on('SIGINT', () => process.exit(0));
  process.argv = process.argv.slice(2);

  if (process.argv.length === 0) {
    log(chalk.yellow('⚠ warn'), 'Nothing to run');
    process.exit(0);
  }
}

function run() {
  const searchArg = (search) => !!process.argv.find(arg => arg.indexOf(search) > -1);
  if (searchArg('db:migrate')) {
    log(chalk.bgGreen(' SCRIPT '), 'scripts/migrate.js\n');
    require('./migrate')(process.argv);
    //process.exit(0);
  } else if (searchArg('db:seed')) {
    log(chalk.bgGreen(' SCRIPT '), 'scripts/seed.js\n');
    require('./seed')(process.argv);
    //process.exit(0);
  } else {
    log(chalk.yellow('⚠ warn'), 'Nothing to run');
  //process.exit(0);
  }
  
}

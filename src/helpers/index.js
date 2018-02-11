'use strict';

exports.randomItem = (array) => array[Math.floor(Math.random() * array.length)];
exports.migratingLog = (migrate, { color, type, err }) => {
  let prefix = 'Migrating';
  let msg = migrate || '';
  const method = type || '';
  switch (color) {
    case 'green':
    prefix = `\x1b[32m${prefix}\x1b[0m`;
    break;
    case 'red':
    prefix = `\x1b[31m${prefix}\x1b[0m`;
    msg += `- ${err || ''}`;
    break;
  }
  console.log(`${prefix} [${method}]: ${msg}`);
};
exports.seedingLog = (seed, { color, err }) => {
  let prefix = 'Seeding';
  let msg = seed || '';
  switch (color) {
    case 'green':
    prefix = `\x1b[32m${prefix}\x1b[0m`;
    break;
    case 'red':
    prefix = `\x1b[31m${prefix}\x1b[0m`;
    msg += `- ${err || ''}`;
    break;
  }
  console.log(`${prefix}: ${msg}`);
};
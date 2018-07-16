module.exports = function () {
  if (process.env.DB_DATABASE.indexOf('test') === -1) {
    process.env.DB_DATABASE = `test_${process.env.DB_DATABASE}`;
  }

  const migrate = require('./migrate');
  const seed = require('./seed');

  migrate([null, 'reset']).then(() => {
    migrate([null, 'latest']).then(() => {
      seed([null, 'run']).then(() => {
        // Clear console
        console.log('\x1Bc');
        console.log('✔ Test Database migrated and seeded!');
        process.exit(0);
      });
    });
  });
};

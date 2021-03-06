const {table} = require('./../orm');

module.exports = {
  find,
  findAll
};

function find(name) {
  return table('roles').first('name', name);
}

function findAll() {
  return table('roles').all();
}

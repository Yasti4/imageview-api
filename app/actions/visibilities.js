const {table} = require('./../orm');

module.exports = {
  find,
  findAll
};

function find(name) {
  return table('visibilities').first('name', name);
}

function findAll() {
  return table('visibilities').all();
}

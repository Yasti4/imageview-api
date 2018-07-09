const {table} = require('./../orm');

module.exports = {
  find,
  findAll
};

function find(name) {
  return table('privacities').first('name', name);
}

function findAll() {
  return table('privacities').all();
}

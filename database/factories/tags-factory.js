const faker = require('faker/locale/es');

function factory(generate = 1, fn = null) {
  const items = [];
  const nameExists = name => items.findIndex(item => item.name === name) >= -1;
  for (let i = 0; i < generate;) {
    let name;
    if (fn) {
      name = fn(items).name;
    }
    name = name || faker.name.findName();
    if (!nameExists(name)) {
      items.push({name});
      i = i + 1;
    }
  }
  return items.length === 1 ? items[0] : items;
}

module.exports = factory;

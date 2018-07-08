const faker = require('faker/locale/es');

function factory(generate = 1, fn = null) {
  const items = [];
  const nameExists = name => !!items.find(item => item.name === name);
  for (let i = 0; i < generate;) {
    let name;
    if (fn) {
      name = fn(items).name;
    }
    name = name || faker.lorem.word();
    if (!nameExists(name)) {
      items.push({name});
      i = i + 1;
    }
  }
  return items.length === 1 ? items[0] : items;
}

module.exports = factory;

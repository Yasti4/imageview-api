const {randomItem} = require('app/util');

function factory(generate = 1, fn = null) {
  const items = [];
  for (let i = 0; i < generate; i = i + 1) {
    const item = fn ? fn(items) : {};
    item.file_id = item.file_id || 1;
    item.width = item.width || +randomItem([320, 640, 1024]);
    item.height = item.height || +randomItem([320, 640, 1024]);
    items.push(item);
  }
  return items.length === 1 ? items[0] : items;
}

module.exports = factory;

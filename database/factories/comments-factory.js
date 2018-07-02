const faker = require('faker/locale/es');

function factory(generate = 1, fn = null) {
  const items = [];
  const now = new Date();
  for (let i = 0; i < generate; i = i + 1) {
    const item = fn ? fn(items) : {};
    item.content = item.content || faker.lorem.sentence();
    item.user_id = item.user_id || 1;
    item.post_id = item.post_id || 1;
    item.created_at = item.created_at || now;
    item.updated_at = item.updated_at || now;
    item.deleted_at = item.deleted_at || null;
    items.push(item);
  }
  return items.length === 1 ? items[0] : items;
}

module.exports = factory;

const faker = require('faker/locale/es');

function factory(generate = 1, fn = null) {
  const items = [];
  const now = new Date();
  for (let i = 0; i < generate; i = i + 1) {
    const item = fn ? fn(items) : {};
    item.description = item.description || faker.lorem.sentence();
    item.enable_comments = item.enable_comments || true;
    item.visibility = item.visibility || 'public';
    item.user_id = item.user_id || 1;
    item.file_id = item.file_id || 1;
    item.album_id = item.album_id || null;
    item.created_at = item.created_at || now;
    item.updated_at = item.updated_at || now;
    item.deleted_at = item.deleted_at || null;
    items.push(item);
  }
  return items.length === 1 ? items[0] : items;
}

module.exports = factory;

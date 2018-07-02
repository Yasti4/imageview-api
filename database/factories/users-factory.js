
const bcrypt = require('bcrypt');
const faker = require('faker/locale/es');

function factory(generate = 1, fn = null) {
  const items = [];
  const now = new Date();
  const password = bcrypt.hashSync('secret', +process.env.APP_SALT || 10);
  const fieldValueExists = (field, value) => items.findIndex(item => item[field] === value) >= -1;
  for (let i = 0; i < generate;) {
    const item = fn ? fn(items) : {};
    item.username = item.username || faker.internet.userName();
    item.email = item.email || faker.internet.email();
    item.password = item.password || password;
    item.name = item.name || faker.name.findName();
    item.lastname = item.username || faker.name.lastName();
    item.role = item.role || 'user';
    item.file_id = item.file_id || 1;
    item.created_at = item.created_at || now;
    item.updated_at = item.updated_at || now;
    item.deleted_at = item.deleted_at || null;
    if (!fieldValueExists('username', item.username) && !fieldValueExists('email', item.email)) {
      items.push(item);
      i = i + 1;
    }
  }
  return items.length === 1 ? items[0] : items;
}

module.exports = factory;

const shortid = require('shortid');

function factory(generate = 1, fn = null) {
  const items = [];
  const now = new Date();
  const filenameExists = filename => !!items.find(item => item.filename === filename);
  for (let i = 0; i < generate;) {
    let filename;
    let timestamps;
    if (fn) {
      const obj = fn(items);
      filename = obj.filename;
      timestamps = {
        created_at: obj.created_at || null,
        updated_at: obj.updated_at || null,
        deleted_at: obj.deleted_at || null
      };
    }
    filename = filename || shortid.generate() + '.jpg';
    timestamps = timestamps || {
      created_at: now,
      updated_at: now,
      deleted_at: null
    }
    if (!filenameExists(filename)) {
      items.push({filename, ...timestamps});
      i = i + 1;
    }
  }
  return items.length === 1 ? items[0] : items;
}

module.exports = factory;

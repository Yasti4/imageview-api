function factory(generate = 1, fn = null) {
  const items = [];
  for (let i = 0; i < generate; i = i + 1) {
    const item = fn ? fn(items) : {};
    items.push({
      tag_id: item.tag_id || 1,
      post_id: item.post_id || 1
    });
  }
  return items.length === 1 ? items[0] : items;
}

module.exports = factory;

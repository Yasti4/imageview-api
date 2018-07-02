function factory(generate = 1, fn = null) {
  const items = [];
  for (let i = 0; i < generate; i = i + 1) {
    const item = fn ? fn(items) : {};
    const visibility = 'public';
    items.push({
      user_id: item.user_id || 1,
      search: item.search || visibility,
      posts: item.posts || visibility,
      albums: item.albums || visibility
    });
  }
  return items.length === 1 ? items[0] : items;
}

module.exports = factory;

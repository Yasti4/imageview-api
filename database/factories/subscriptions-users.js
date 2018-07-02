function factory(generate = 1, fn = null) {
  const items = [];
  for (let i = 0; i < generate; i = i + 1) {
    const item = fn ? fn(items) : {};
    items.push({
      user_followed: item.user_followed || 1,
      user_follower: item.user_follower || 1
    });
  }
  return items.length === 1 ? items[0] : items;
}

module.exports = factory;

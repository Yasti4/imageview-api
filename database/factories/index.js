module.exports = function factory(table, total = 1, fn = null) {
  switch (table) {
    case 'tags':
      return require('./tags-factory')(total, fn);
    case 'files':
      return require('./files-factory')(total, fn);
    case 'images':
      return require('./images-factory')(total, fn);
    case 'users':
      return require('./users-factory')(total, fn);
    case 'albums':
      return require('./albums-factory')(total, fn);
    case 'posts':
      return require('./posts-factory')(total, fn);
    case 'comments':
      return require('./comments-factory')(total, fn);
    case 'privacities':
      return require('./privacities-factory')(total, fn);
    case 'likes_albums':
      return require('./likes-albums-factory')(total, fn);
    case 'likes_posts':
      return require('./likes-posts-factory')(total, fn);
    case 'likes_comments':
      return require('./likes-comments-factory')(total, fn);
    case 'posts_tags':
      return require('./posts-tags-factory')(total, fn);
    case 'subscriptions_users':
      return require('./subscriptions-users-factory')(total, fn);
    case 'subscriptions_albums':
      return require('./subscriptions-albums-factory')(total, fn);
    default:
      throw Error('Table factory not found!');
  }
};

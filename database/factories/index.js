function factory(table, total = 1, fn = null) {
  switch (table) {
    case 'tags':
      return require('./tags-factory')(total, fn);
    case 'files':
      return require('./files-factory')(total, fn);
    case 'images': // TODO: FK's
      return require('./images-factory')(total, fn);
    case 'users': // TODO: FK's
      return require('./users-factory')(total, fn);
    case 'albums': // TODO: FK's
      return require('./albums-factory')(total, fn);
    case 'posts': // TODO: FK's
      return require('./posts-factory')(total, fn);
    case 'comments': // TODO: FK's
      return require('./comments-factory')(total, fn);
    case 'privacities': // TODO: FK's
      return require('./privacities-factory')(total, fn);
    case 'likes_albums': // TODO: FK's
      return require('./likes-albums-factory')(total, fn);
    case 'likes_posts': // TODO: FK's
      return require('./likes-posts-factory')(total, fn);
    case 'likes_comments': // TODO: FK's
      return require('./likes-comments-factory')(total, fn);
    case 'posts_tags': // TODO: FK's
      return require('./posts-tags-factory')(total, fn);
    case 'subscriptions_users': // TODO: FK's
      return require('./subscriptions-users-factory')(total, fn);
    case 'subscriptions_albums': // TODO: FK's
      return require('./subscriptions-albums-factory')(total, fn);
    default:
      throw Error('Table factory not found!');
  }
}

module.exports = factory;

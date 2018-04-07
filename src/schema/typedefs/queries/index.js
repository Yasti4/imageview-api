'use strict';

module.exports = `type Query {
  ${require('./user.queries')}
  ${require('./album.queries')}
  ${require('./visibility.queries')}
  ${require('./privacity.queries')}
  ${require('./tag.queries')}
  ${require('./comment.queries')}
  ${require('./image.queries')}
  ${require('./post.queries')}
  ${require('./role.queries')}
}`;

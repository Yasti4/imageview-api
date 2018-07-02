export default function loadTables(orm) {
  require('./roles')(orm); // TODO: Relations
  require('./tags')(orm); // TODO: Relations
  require('./visibilities')(orm); // TODO: Relations
  require('./files')(orm); // TODO: Relations
  require('./images')(orm); // TODO: Relations
  require('./users')(orm); // TODO: Relations
  require('./albums')(orm); // TODO: Relations
  require('./posts')(orm); // TODO: Relations
  require('./comments')(orm); // TODO: Relations
  require('./privacities')(orm); // TODO: Relations
  require('./likes-albums')(orm); // TODO: Relations
  require('./likes-posts')(orm); // TODO: Relations
  require('./likes-comments')(orm); // TODO: Relations
  require('./posts-tags')(orm); // TODO: Relations
  require('./subscriptions-users')(orm); // TODO: Relations
  require('./subscriptions-albums')(orm); // TODO: Relations
}

module.exports = function loadTables(orm) {
  require('./roles')(orm);
  require('./tags')(orm);
  require('./visibilities')(orm);
  require('./files')(orm);
  require('./images')(orm);
  require('./users')(orm);
  require('./albums')(orm);
  require('./posts')(orm);
  require('./comments')(orm);
  require('./privacities')(orm);
  require('./likes-albums')(orm);
  require('./likes-posts')(orm);
  require('./likes-comments')(orm);
  require('./posts-tags')(orm);
  require('./subscriptions-users')(orm);
  require('./subscriptions-albums')(orm);
}

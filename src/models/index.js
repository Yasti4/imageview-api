'use strict';

const { createDatabase } = require('./../helpers');

module.exports = createDatabase([
  require('./album'),
  require('./comment'),
  require('./image'),
  require('./post'),
  require('./privacity'),
  require('./role'),
  require('./tag'),
  require('./user'),
  require('./visibility'),
  // n-m
  require('./like-post')
]);

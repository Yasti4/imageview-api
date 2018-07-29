'use strict';

const {isTesting} = require('./../../util');

module.exports = `
  scalar Date
  ${isTesting ? 'scalar Upload' : ''}
`;

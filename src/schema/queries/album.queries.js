'use strict';

module.exports = `
  album(id: Int!): Album
  albums(userId: Int, limit: Int): [Album!]!
`;

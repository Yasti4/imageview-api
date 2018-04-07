'use strict';

module.exports = `
  post(id: Int!): Post
  posts(userId: Int, albumId: Int, limit: Int): [Post!]!
`;

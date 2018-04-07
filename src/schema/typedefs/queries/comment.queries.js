'use strict';

module.exports = `
  comment(id: Int!): Comment
  comments(userId: Int, postId: Int, limit: Int): [Comment!]!
`;

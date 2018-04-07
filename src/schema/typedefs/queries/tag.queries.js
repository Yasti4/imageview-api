'use strict';

module.exports = `
  tag(name: String!): Tag
  tags(postId: Int, limit: Int): [Tag!]!
`;

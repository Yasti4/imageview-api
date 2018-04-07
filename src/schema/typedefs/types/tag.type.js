'use strict';

module.exports = `type Tag {
  id: Int!
  name: String!

  posts: [Post!]!
}`;

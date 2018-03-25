'use strict';

module.exports = `type Album {
  id: Int!
  title: String!
  description: String
  visibility: String!
  createdAt: String
  updatedAt: String
  deletedAt: String

  posts: [Post!]!
  subscribers: [User!]!
  likes: Int!
}`;

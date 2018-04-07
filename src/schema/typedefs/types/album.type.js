'use strict';

module.exports = `type Album {
  id: Int!
  title: String!
  description: String
  visibility: String!
  createdAt: Date
  updatedAt: Date
  deletedAt: Date

  posts: [Post!]!
  subscribers: [User!]!
  likes: Int!
}`;

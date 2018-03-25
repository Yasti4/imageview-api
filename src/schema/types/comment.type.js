'use strict';

module.exports = `type Comment {
  id: Int!
  content: String!
  createdAt: String
  updatedAt: String
  deletedAt: String

  user: User!
  post: Post!

  likes: Int!
}`;

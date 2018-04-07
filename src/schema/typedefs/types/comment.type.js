'use strict';

module.exports = `type Comment {
  id: Int!
  content: String!
  createdAt: Date
  updatedAt: Date
  deletedAt: Date

  user: User!
  post: Post!

  likes: Int!
}`;

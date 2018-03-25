'use strict';

module.exports = `type Post {
  id: Int!
  description: String
  visibility: String!
  enableComments: Boolean
  createdAt: String
  updatedAt: String
  deletedAt: String

  user: User!
  album: Album
  image: Image!
  likes: Int!
  comments: [Comment!]!
  tags: [Tag!]!
}`;

'use strict';

module.exports = `type Post {
  id: Int!
  description: String
  visibility: String!
  enableComments: Boolean
  createdAt: Date
  updatedAt: Date
  deletedAt: Date

  user: User!
  album: Album
  image: Image!
  likes: Int!
  comments: [Comment!]!
  tags: [Tag!]!
}`;

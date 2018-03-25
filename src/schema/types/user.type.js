'use strict';

module.exports = `type User {
  id: Int!
  username: String!
  email: String!
  name: String!
  lastname: String!
  role: String!
  createdAt: Date
  updatedAt: Date
  deletedAt: Date

  image: Image!
  following: [User!]!
  followers: [User!]!
  posts: [Post!]!
  postsLikes: [Post!]!
  albums: [Album!]!
  albumsSubscriptions: [Album!]!
  albumsLikes: [Album!]!
  comments: [Comment!]!
  commentsLikes: [Comment!]!
}`;

'use strict';

module.exports = `type User {
  id: Int!
  username: String!
  email: String! @auth(role: "user")
  name: String!
  lastname: String!
  role: String! @auth(role: "admin")
  createdAt: Date
  updatedAt: Date @auth(role: "admin")
  deletedAt: Date @auth(role: "admin")

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

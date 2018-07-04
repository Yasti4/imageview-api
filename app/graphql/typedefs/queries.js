'use strict';

module.exports = `type Query {

  album(id: Int!): Album
  albums(userId: Int, limit: Int): [Album!]!

  comment(id: Int!): Comment
  comments(userId: Int, postId: Int, limit: Int): [Comment!]!

  image(id: Int!): Image
  images(fileId: Int, limit: Int): [Image!]!

  post(id: Int!): Post
  posts(userId: Int, albumId: Int, limit: Int): [Post!]!
  feed(page: Int = 1, limit: Int = 10): [Post!]!

  privacity(userId: Int!): Privacity

  role(name: String!): Role @auth(role: "user")
  roles: [Role!]! @auth(role: "admin")

  tag(name: String!): Tag
  tags(postId: Int, limit: Int): [Tag!]!
 
  search(search: String!, page: Int = 1, limit: Int = 10): [SearchResult!]!

  user(id: Int, username: String, email: String): User
  users(limit: Int): [User!]!
  me(token: String): User

  visibility(name: String!): Visibility
  visibilities: [Visibility!]!

  forgottenPassword(email: String!): Boolean!
}`;
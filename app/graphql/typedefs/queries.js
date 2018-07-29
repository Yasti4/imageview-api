'use strict';

module.exports = `type Query {

  album(id: Int!, withTrashed: Boolean = false): Album
  albums(userId: Int, limit: Int, withTrashed: Boolean = false): [Album!]!

  comment(id: Int!, withTrashed: Boolean = false): Comment
  comments(userId: Int, postId: Int, limit: Int, withTrashed: Boolean = false): [Comment!]!

  image(id: Int!): Image
  images(fileId: Int, limit: Int): [Image!]!

  post(id: Int!, withTrashed: Boolean = false): Post
  posts(userId: Int, albumId: Int, limit: Int, withTrashed: Boolean = false): [Post!]!
  feed(page: Int = 1, limit: Int = 10): [Post!]!

  privacity(userId: Int!): Privacity @auth(as: "owner")
  privacities: [Privacity!]! @auth(as: "admin")

  role(name: String!): Role
  roles: [Role!]! @auth(as: "admin")

  tag(name: String!): Tag
  tags(postId: Int, limit: Int): [Tag!]!
 
  search(search: String!, page: Int = 1, limit: Int = 10): [SearchResult!]!

  user(id: Int, username: String, email: String, withTrashed: Boolean = false): User
  users(limit: Int, withTrashed: Boolean = false): [User!]! @auth(as: "admin")
  me(token: String): User

  visibility(name: String!): Visibility
  visibilities: [Visibility!]!

  forgottenPassword(email: String!): Boolean!
}`;

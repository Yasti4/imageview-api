'use strict';

module.exports = `type Mutation {

  createPost(input: PostInput!): Post
  updatePost(id: Int!, input: PostInput!): Boolean!
  deletePost(id: Int!): Boolean!

  createPrivacity(input: PrivacityInput!): Privacity
  updatePrivacity(input: PrivacityInput!): Boolean!

  createRole(name: String!): Role
  updateRole(oldName: String!, newName: String!): Boolean!
  deleteRole(name: String!): Boolean!

  uploadImage(file: Upload!): Image

  signIn(email: String!, password: String!): JWT
  createUser(input: UserInput!): User
  updateUser(input: UserInput!): User
  follow(input: UserFollow!): Boolean

  createVisibility(name: String!): Visibility
  deleteVisibility(oldName: String!, newName: String!): Visibility
  
}`;

'use strict';

module.exports = `type Mutation {

  createPost(input: PostInput!): Post
  updatePost(id: Int!, input: PostInput!): Boolean!
  deletePost(id: Int!): Boolean!

  createPrivacity(input: PrivacityInputInsert!): Privacity
  updatePrivacity(input: PrivacityInputUpdate!): Boolean!

  createRole(name: String!): Role
  updateRole(oldName: String!, newName: String!): Boolean!
  deleteRole(name: String!): Boolean!

  uploadImage(file: Upload!): Image

  signIn(email: String!, password: String!): JWT
  createUser(input: UserInputInsert!): User
  updateUser(username: String!, input: UserInputUpdate!): User
  follow(input: UserFollow!): Boolean

  createVisibility(name: String!): Visibility
  deleteVisibility(oldName: String!, newName: String!): Visibility
  
}`;

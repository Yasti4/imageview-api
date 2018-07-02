'use strict';

module.exports = `type Mutation {

  createAlbum(input: AlbumInput!): Album
  updateAlbum(id: Int!, input: AlbumInput!): Boolean!
  deleteAlbum(id: Int!): Boolean!

  createPost(input: PostInput!): Post
  updatePost(id: Int!, input: PostInput!): Boolean!
  deletePost(id: Int!): Boolean!

  createComment(input: CommentInput!): Comment
  updateComment(id: Int!, comment: String!): Boolean!

  createPrivacity(input: PrivacityInput!): Privacity
  updatePrivacity(input: PrivacityInput!): Boolean!

  createRole(name: String!): Role
  updateRole(oldName: String!, newName: String!): Boolean!
  deleteRole(name: String!): Boolean!

  uploadImage(file: Upload!): File

  signIn(email: String!, password: String!): JWT
  createUser(input: UserInput!): User
  updateUser(input: UserInput!): Boolean!
  changePassword(old: String!, new: String!): Boolean!
  updateUserPrivacity(input: UserPrivacityInput!): Boolean!
  
  follow(input: FollowInput!): Boolean!
  like(input: LikeInput!): Boolean!

  createVisibility(name: String!): Visibility
  deleteVisibility(oldName: String!, newName: String!): Visibility
  
}`;

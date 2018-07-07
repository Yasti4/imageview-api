'use strict';

module.exports = `type Mutation {

  createAlbum(input: AlbumInput!): Album
  updateAlbum(id: Int!, input: AlbumInput!, withTrashed: Boolean = false): Boolean!
  deleteAlbum(id: Int!, softDelete: Boolean = true): Boolean!

  createPost(input: PostInput!): Post
  updatePost(id: Int!, input: PostInput!, withTrashed: Boolean = false): Boolean!
  deletePost(id: Int!, softDelete: Boolean = true): Boolean!

  createComment(input: CommentInput!): Comment
  updateComment(id: Int!, content: String!, withTrashed: Boolean = false): Boolean!
  deleteComment(id: Int!, softDelete: Boolean = true): Boolean!

  uploadImage(file: Upload!, withTrashed: Boolean = false): File

  signIn(email: String!, password: String!): JWT
  createUser(input: UserInput!): User
  updateUser(input: UserInput!, withTrashed: Boolean = false): Boolean!
  changePassword(old: String!, new: String!, withTrashed: Boolean = false): Boolean!
  updateUserPrivacity(input: UserPrivacityInput!, withTrashed: Boolean = false): Boolean!
  
  follow(input: FollowInput!): Boolean!
  like(input: LikeInput!): Boolean!

  createVisibility(name: String!): Visibility
  deleteVisibility(oldName: String!, newName: String!, softDelete: Boolean = true): Visibility
  
}`;

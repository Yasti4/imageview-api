'use strict';

module.exports = `type Mutation {

  createAlbum(input: AlbumInput!): Album @auth(as: "user")
  updateAlbum(id: Int!, input: AlbumInput!, withTrashed: Boolean = false): Boolean! @auth(as: "owner")
  deleteAlbum(id: Int!, softDelete: Boolean = true): Boolean! @auth(as: "owner")

  createPost(input: PostInput!): Post @auth(as: "user")
  updatePost(id: Int!, input: PostInput!, withTrashed: Boolean = false): Boolean! @auth(as: "owner")
  deletePost(id: Int!, softDelete: Boolean = true): Boolean! @auth(as: "owner")

  createComment(input: CommentInput!): Comment @auth(as: "user")
  updateComment(id: Int!, content: String!, withTrashed: Boolean = false): Boolean! @auth(as: "owner")
  deleteComment(id: Int!, softDelete: Boolean = true): Boolean! @auth(as: "owner")

  uploadImage(file: Upload = null): File @auth(as: "user")

  signIn(email: String!, password: String!): JWT
  createUser(input: UserInput!): User
  updateUser(input: UserInput!, withTrashed: Boolean = false): Boolean! @auth(as: "owner")
  changePassword(old: String!, new: String!, withTrashed: Boolean = false): Boolean! @auth(as: "owner")
  updateUserPrivacity(input: UserPrivacityInput!, withTrashed: Boolean = false): Boolean! @auth(as: "owner")
  
  follow(input: FollowInput!): Boolean! @auth(as: "user")
  like(input: LikeInput!): Boolean! @auth(as: "user")

  createVisibility(name: String!): Visibility @auth(as: "admin")
  deleteVisibility(oldName: String!, newName: String!, softDelete: Boolean = true): Visibility @auth(as: "admin")
  
}`;

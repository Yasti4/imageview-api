'use strict';

module.exports = `

  type Album {
    id: Int!
    title: String!
    description: String
    visibility: String!
    createdAt: Date
    updatedAt: Date
    deletedAt: Date
    posts: [Post!]!
    subscribers: [User!]!
    likes: Int!
  }

  type Comment {
    id: Int!
    content: String!
    createdAt: Date
    updatedAt: Date
    deletedAt: Date
    user: User!
    post: Post!
    likes: Int!
  }

  type Image {
    id: Int!
    small: String!
    medium: String!
    large: String
    user: User
    post: Post
  }

  type JWT {
    tokenType: String!
    expiresIn: Int!
    accessToken: String!
  }

  type Post {
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
  }

  type Privacity {
    id: Int!
    user_id: Int!
    search: String!
    posts: String!
    albums: String!
    user: User!
  }

  type Role {
    name: String!
    users: [User!]!
  }

  type Tag {
    id: Int!
    name: String!
    posts: [Post!]!
  }

  type User {
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
  }

  type Visibility {
    name: String!
    albums: [Album!]!
    posts: [Post!]!
  }

`;

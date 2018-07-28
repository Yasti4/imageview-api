'use strict';

module.exports = `

  type Album implements Timestamps {
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

  type Comment implements Timestamps {
    id: Int!
    content: String!
    createdAt: Date
    updatedAt: Date
    deletedAt: Date
    user: User!
    post: Post!
    likes: Int!
  }

  type File implements Timestamps {
    id: Int!
    filename: String!
    createdAt: Date
    updatedAt: Date
    deletedAt: Date
    images: [Image!]!
    user: User
    post: Post
  }

  type Image {
    id: Int!
    file: File!
    type: String!
    width: Int!
    height: Int!
  }

  type JWT {
    tokenType: String!
    expiresIn: Int!
    accessToken: String!
  }

  type Post implements Timestamps {
    id: Int!
    description: String
    visibility: String!
    enableComments: Boolean
    createdAt: Date
    updatedAt: Date
    deletedAt: Date
    user: User!
    album: Album
    file: File!
    likes: Int!
    comments: [Comment!]!
    tags: [Tag!]!
    images: [Image!]!
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

  type User implements Timestamps {
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
    postsLikes: Int!
    albums: [Album!]!
    albumsSubscriptions: Int!
    albumsLikes: Int!
    comments: [Comment!]!
    commentsLikes: Int!
  }

  type Visibility {
    name: String!
    albums: [Album!]!
    posts: [Post!]!
  }

`;

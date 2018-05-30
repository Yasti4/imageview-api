'use strict';

module.exports = `

  input AlbumInput {
    title: String!
    description: String
    visibility: String!
  }

  input CommentInput {
    content: String!
    post_id: Int!
  }

  input PostInput {
    description: String
    user_id: Int!
    album_id: Int
    image_id: Int!
    visibility: String!
    enable_comments: Boolean!
    #tags: [Tag!]
  }

  input PrivacityInput {
    user_id: Int!
    search: String!
    posts: String!
    albums: String!
  }
  
  input UserFollow {
    user_followed: Int!
    user_follower: Int!
  }

  input UserInput {
    username: String!
    email: String!
    password: String
    name: String!
    lastname: String!
    role: String!
  }

`;

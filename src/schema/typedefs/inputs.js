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
    album_id: Int
    image_id: Int!
    visibility: String = "public"
    enable_comments: Boolean = true
    # tags: [Tag!]! = []
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
    image_id: Int!
    username: String!
    email: String!
    password: String
    name: String!
    lastname: String!
    role: String = "user"
  }

  input UserPrivacityInput {
    search: String = "public"
    posts: String = "public"
    albums: String = "public"
  }

`;

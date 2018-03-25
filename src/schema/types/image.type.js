'use strict';

module.exports = `type Image {
  id: Int!
  small: String!
  medium: String!
  large: String

  user: User
  post: Post
}`;

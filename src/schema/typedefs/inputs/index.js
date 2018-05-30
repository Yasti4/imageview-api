'use strict';

module.exports = `
  ${require('./privacity-insert.input')}
  ${require('./privacity-update.input')}
  ${require('./user-follow.input')}
  ${require('./user-insert.input')}
  ${require('./user-update.input')}
  ${require('./comment-insert.input')}

  input PostInput {
    description: String
    user_id: Int!
    album_id: Int
    image_id: Int!
    visibility: String!
    enable_comments: Boolean!
  }
`;

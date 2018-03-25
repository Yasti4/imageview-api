'use strict';

module.exports = `
  createUser(input: UserInputInsert!): User
  updateUser(username: String!, input: UserInputUpdate!): User
  following(input: UserFollow!): User
`;
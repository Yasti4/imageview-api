'use strict';

module.exports = `
  signIn(email: String!, password: String!): JWT
  createUser(input: UserInputInsert!): User
  updateUser(username: String!, input: UserInputUpdate!): User
  follow(input: UserFollow!): Boolean
`;
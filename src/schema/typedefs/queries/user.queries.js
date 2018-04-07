'use strict';

module.exports = `
  user(id: Int, username: String, email: String): User
  users(limit: Int): [User!]!
`;

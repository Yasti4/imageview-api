'use strict';

module.exports = `
  role(name: String!): Role @auth(role: "user")
  roles: [Role!]! @auth(role: "admin")
`;

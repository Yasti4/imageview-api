'use strict';

module.exports = `
  role(name: String!): Role
  roles: [Role!]! @auth
`;
